import React, { useEffect, useState, useReducer } from 'react';
import isEqual from 'lodash/isEqual';
import Loader from 'shared/Loader';
import { useDropboxClient } from 'shared';
import Player from './Player';

function FolderPicker({ onSelectFolder, selectedFolderId }) {
  const [folders, setFolders] = useState(null);
  const { client } = useDropboxClient();

  useEffect(() => {
    async function listFiles() {
      const result = await client.filesListFolder({
        path: '',
      });
      const folders = result.entries.filter(
        e => e['.tag'] === 'folder' && e.name !== 'images'
      );
      setFolders(folders);
    }
    listFiles();
  }, []);

  return folders === null ? (
    <Loader />
  ) : (
    <select
      onChange={({ target }) =>
        onSelectFolder(folders.find(f => f.id === target.value))
      }
      value={selectedFolderId}
    >
      <option value={undefined}>
        {' '}
        -- select an animation folder or video file --{' '}
      </option>
      {folders.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
}

function useListFolderFiles(folder, onReceiveFolderFiles) {
  const [files, setItems] = useState(null);
  const { client } = useDropboxClient();

  useEffect(
    () => {
      async function listFiles() {
        const result = await client.filesListFolder({
          path: folder.path_display,
        });
        const files = await Promise.all(
          result.entries.map(async f => {
            const file = await client.sharingCreateSharedLink({
              path: f.path_display,
            });
            return {
              ...f,
              ...file,
              index: parseInt(/\d+/g.exec(f.name)[0], 10),
              url: file.url.replace(/.$/, '1'),
            };
          })
        );
        const sortedFiles = files.sort((a, b) => a.index - b.index);
        setItems(sortedFiles);
      }
      if (folder) listFiles();
    },
    [folder]
  );

  useEffect(
    () => {
      onReceiveFolderFiles(files);
    },
    [files]
  );
}

const reducer = (state, nextState) => ({ ...state, ...nextState });

export default function AnimationSection({
  save,
  selectedFolder: defaultSelectedFolder,
  files: defaultFiles,
  ...restProps
}) {
  const defaultSettings = {
    selectedFolder: defaultSelectedFolder,
    files: defaultFiles,
  };
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [settings, updateSettings] = useReducer(reducer, defaultSettings);
  const { selectedFolder, files } = settings;
  useListFolderFiles(selectedFolder || defaultSelectedFolder, files =>
    updateSettings({ files })
  );

  useEffect(
    () => {
      setIsSaveDisabled(isEqual(defaultSettings, settings));
    },
    [settings]
  );

  return (
    <div>
      <FolderPicker
        onSelectFolder={selectedFolder =>
          updateSettings({ selectedFolder, files: null })
        }
        selectedFolderId={
          selectedFolder ? selectedFolder.id : defaultSelectedFolder
        }
      />
      {selectedFolder &&
        (Array.isArray(files) ? (
          <Player frames={files.map(f => f.url)} />
        ) : (
          <Loader />
        ))}
      <button
        disabled={isSaveDisabled}
        onClick={() => save(settings)}
        title={isSaveDisabled ? 'No changes to save' : null}
      >
        Save animation
      </button>
    </div>
  );
}
