'use client';

import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function SiteFooter() {
  const { t } = useAppTranslation();

  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
          <p>{t('footer.copy', '© 2025 Customized Energy Solutions Ltd. All rights reserved.')}</p>
        </div>
      </div>
    </footer>
  );
}
