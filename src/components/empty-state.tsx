import { Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { Icon } from '@/components/icon';
import type { ComponentProps } from 'react';

interface EmptyStateProps {
  icon: ComponentProps<typeof Icon>['name'];
  title: string;
  hint: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, hint, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View className="items-center gap-3 py-8">
      <View className="size-16 items-center justify-center rounded-full bg-lilac">
        <Icon name={icon} size={30} tone="accent" />
      </View>
      <Text className="text-emph font-semibold text-foreground">{title}</Text>
      <Text className="text-center text-body text-muted">{hint}</Text>
      {actionLabel && onAction ? <ActionButton label={actionLabel} onPress={onAction} variant="secondary" className="self-stretch" /> : null}
    </View>
  );
}
