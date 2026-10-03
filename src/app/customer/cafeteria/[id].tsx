import { Redirect, useLocalSearchParams, useRouter, type Href } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { StallCard } from '@/components/stall-card';
import { StatusChip } from '@/components/status-chip';
import { CAFETERIAS, STALLS } from '@/features/flasheat/data/seed';
import { useFlashEatStore } from '@/features/flasheat/store/flasheat-store';
import { allSlotsFull } from '@/features/flasheat/utils/slots';
import { estimatedLineWait } from '@/features/flasheat/utils/format';
import { useNames, useT } from '@/i18n/use-t';

export default function CafeteriaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useT();
  const nameOf = useNames();
  const router = useRouter();
  const bookings = useFlashEatStore((s) => s.bookings);
  const cafeteria = CAFETERIAS.find((c) => c.id === id);
  if (!cafeteria) return <Redirect href={'/customer' as Href} />;
  const names = nameOf(cafeteria);
  const tone = cafeteria.crowdLevel === 'packed' ? 'red' : cafeteria.crowdLevel === 'busy' ? 'amber' : 'green';

  return (
    <View className="flex-1 bg-background">
      <AppHeader showBack />
      <ScrollView className="flex-1" contentContainerClassName="px-4 pt-6 pb-safe-offset-4 gap-4">
        <View className="gap-2">
          <Text accessibilityRole="header" className="text-title font-bold text-foreground">{names.primary}</Text>
          <Text className="text-body text-muted">{names.secondary}</Text>
          <View className="flex-row items-center gap-2">
            <StatusChip label={t(`home.${cafeteria.crowdLevel}`)} tone={tone} />
            <Text className="text-body text-foreground">{t('home.lineWait', { n: cafeteria.lineWaitMin })}</Text>
          </View>
        </View>
        {STALLS.filter((s) => s.cafeteriaId === cafeteria.id).map((s) => (
          <StallCard
            key={s.id}
            stall={s}
            lineWait={estimatedLineWait(cafeteria.lineWaitMin, s.prepTimeMin)}
            allFull={allSlotsFull(bookings, s.id)}
            onOpen={() => router.push(`/customer/stall/${s.id}` as Href)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
