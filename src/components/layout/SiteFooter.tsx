'use client';

import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function SiteFooter() {
  const { t } = useAppTranslation();

  return (
    <footer className="bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          <p>{t('footer.copy', '© 2025 Customized Energy Solutions Ltd. All rights reserved.')}</p>
        </div>
      </div>
    </footer>
  );
}
