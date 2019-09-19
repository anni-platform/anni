import React, { Suspense } from 'react';
import Loader from 'shared/Loader';

const AnimationSection = React.lazy(() => import('./AnimationSection'));

export default function ProjectProseSection(props) {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <AnimationSection {...props} />
      </Suspense>
    </div>
  );
}
