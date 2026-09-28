'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ModuleErrorBoundaryProps {
  children: ReactNode;
  moduleTitle?: string;
}

interface ModuleErrorBoundaryState {
  error: Error | null;
}

export default class ModuleErrorBoundary extends Component<
  ModuleErrorBoundaryProps,
  ModuleErrorBoundaryState
> {
  state: ModuleErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ModuleErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Innovation module failed to render', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          role="alert"
          data-testid="module-error"
          className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-slate-800"
        >
          <h4 className="text-lg font-semibold text-slate-900">
            {this.props.moduleTitle
              ? `${this.props.moduleTitle} is unavailable`
              : 'This module is unavailable'}
          </h4>
          <p className="mt-2 text-sm text-slate-700">
            The module could not be displayed. Live telemetry or rendering is not available in this
            session, so nothing is being invented to fill the view.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
