import { Redirect, useRouter, type Href } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { AppHeader } from '@/components/app-header';
import { PickupResultView } from '@/components/pickup-result-view';
import { PinPad } from '@/components/pin-pad';
import { useFlashEatStore } from '@/features/flasheat/store/flasheat-store';
import type { PickupResult } from '@/features/flasheat/types/flasheat';
import { useT } from '@/i18n/use-t';

export default function PickupCheckScreen() {
  const { t } = useT();
  const router = useRouter();
  const stallId = useFlashEatStore((s) => s.session.tenantStallId);
  const verifyPickup = useFlashEatStore((s) => s.verifyPickup);
  const [digits, setDigits] = useState('');
  const [result, setResult] = useState<PickupResult | null>(null);

  if (!stallId) return <Redirect href={'/' as Href} />;

  if (result) {
    return (
      <View className="flex-1">
        <PickupResultView
          result={result}
          onNext={() => {
            setResult(null);
            setDigits('');
          }}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <AppHeader showBack />
      <View className="flex-1 gap-6 px-4 pt-6 pb-safe-offset-4">
        <View className="gap-2">
          <Text accessibilityRole="header" className="text-title font-bold text-foreground">{t('pickup.title')}</Text>
          <Text className="text-body text-muted">{t('pickup.subtitle')}</Text>
        </View>
        <PinPad digits={digits} onChange={setDigits} />
        <ActionButton label={t('pickup.check')} disabled={digits.length !== 4} onPress={() => setResult(verifyPickup(stallId, digits))} />
      </View>
    </View>
  );
}
