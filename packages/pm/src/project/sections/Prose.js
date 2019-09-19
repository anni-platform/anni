import React, { Suspense } from 'react';
import Loader from 'shared/Loader';

const TextEditor = React.lazy(() => import('shared/TextEditor'));

export default function ProjectProseSection(props) {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <TextEditor {...props} />
      </Suspense>
    </div>
  );
}
