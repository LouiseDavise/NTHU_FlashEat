import { Text, View } from 'react-native';

import { Card } from '@/components/card';
import { useT } from '@/i18n/use-t';

interface TodaySummaryProps {
  orders: number;
  revenue: number;
}

export function TodaySummary({ orders, revenue }: TodaySummaryProps) {
  const { t } = useT();
  return (
    <Card>
      <Text className="text-caption font-semibold text-muted">{t('tenant.today')}</Text>
      <View className="flex-row items-end justify-between">
        <Text className="text-body text-foreground">
          <Text className="text-section font-bold">{orders}</Text> {t('tenant.ordersToday')}
        </Text>
        <Text className="text-body text-foreground">
          <Text className="text-section font-bold text-accent">NT${revenue}</Text> {t('tenant.revenue')}
        </Text>
      </View>
    </Card>
  );
}
