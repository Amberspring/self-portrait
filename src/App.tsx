/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { OpeningScreen } from './components/entry/OpeningScreen';
import { SystemView } from './components/system/SystemView';
import { LifeView } from './components/life/LifeView';
import { ProjectCaseStudyView } from './components/projects/ProjectCaseStudyView';
import { WritingDetailView } from './components/shared/WritingDetailView';

type RouteState =
  | { view: 'opening' }
  | { view: 'system' }
  | { view: 'life' }
  | { view: 'project'; slug: string; origin: 'system' | 'life' }
  | { view: 'writing'; slug: string; origin: 'system' | 'life' };

function PortfolioRouter() {
  const [route, setRoute] = useState<RouteState>({ view: 'opening' });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [route.view]);

  if (route.view === 'opening') {
    return (
      <OpeningScreen
        onSelectMode={(mode) => setRoute({ view: mode })}
      />
    );
  }

  if (route.view === 'project') {
    return (
      <ProjectCaseStudyView
        slug={route.slug}
        originMode={route.origin}
        onBack={() => setRoute({ view: route.origin })}
        onSwitchMode={(targetMode) => setRoute({ view: targetMode })}
      />
    );
  }

  if (route.view === 'writing') {
    return (
      <WritingDetailView
        slug={route.slug}
        originMode={route.origin}
        onBack={() => setRoute({ view: route.origin })}
        onSwitchMode={(targetMode) => setRoute({ view: targetMode })}
      />
    );
  }

  if (route.view === 'life') {
    return (
      <LifeView
        onSwitchToSystem={() => setRoute({ view: 'system' })}
        onReturnToOpening={() => setRoute({ view: 'opening' })}
        onOpenProject={(slug) =>
          setRoute({ view: 'project', slug, origin: 'life' })
        }
        onOpenWriting={(slug) =>
          setRoute({ view: 'writing', slug, origin: 'life' })
        }
      />
    );
  }

  return (
    <SystemView
      onSwitchToLife={() => setRoute({ view: 'life' })}
      onReturnToOpening={() => setRoute({ view: 'opening' })}
      onOpenProject={(slug) =>
        setRoute({ view: 'project', slug, origin: 'system' })
      }
      onOpenWriting={(slug) =>
        setRoute({ view: 'writing', slug, origin: 'system' })
      }
    />
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioRouter />
    </LanguageProvider>
  );
}
