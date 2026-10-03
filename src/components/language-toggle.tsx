import { Text, View } from 'react-native';

import { Pressable } from '@/components/pressable';
import { useFlashEatStore } from '@/features/flasheat/store/flasheat-store';
import { useT } from '@/i18n/use-t';
import { cn } from '@/lib/cn';

interface LanguageToggleProps {
  onPurple?: boolean;
}

export function LanguageToggle({ onPurple = true }: LanguageToggleProps) {
  const { t, language } = useT();
  const setLanguage = useFlashEatStore((s) => s.setLanguage);
  const ring = onPurple ? 'border-accent-foreground' : 'border-accent';
  const on = onPurple ? 'bg-accent-foreground' : 'bg-accent';
  const onText = onPurple ? 'text-accent' : 'text-accent-foreground';
  const offText = onPurple ? 'text-accent-foreground' : 'text-accent';
  return (
    <Pressable
      onPress={() => setLanguage(language === 'en' ? 'zh' : 'en')}
      accessibilityRole="button"
      accessibilityLabel={t('header.language')}
      className="min-h-11 justify-center"
    >
      <View className={cn('flex-row overflow-hidden rounded-full border', ring)}>
        <Text className={cn('px-3 py-1 text-caption font-bold', language === 'en' ? cn(on, onText) : offText)}>EN</Text>
        <Text className={cn('px-3 py-1 text-caption font-bold', language === 'zh' ? cn(on, onText) : offText)}>中</Text>
      </View>
    </Pressable>
  );
}
