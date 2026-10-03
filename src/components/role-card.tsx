import type { ReactNode } from 'react';
import type { ComponentProps } from 'react';
import { Text, View } from 'react-native';

import { Icon } from '@/components/icon';

interface RoleCardProps {
  icon: ComponentProps<typeof Icon>['name'];
  title: string;
  description: string;
  children: ReactNode;
}

export function RoleCard({ icon, title, description, children }: RoleCardProps) {
  return (
    <View className="gap-4 rounded-2xl border border-border bg-background p-4">
      <View className="flex-row items-center gap-3">
        <View className="size-11 items-center justify-center rounded-full bg-lilac">
          <Icon name={icon} size={22} tone="accent" />
        </View>
        <View className="flex-1">
          <Text className="text-emph font-semibold text-foreground">{title}</Text>
          <Text className="text-caption text-muted">{description}</Text>
        </View>
      </View>
      {children}
    </View>
  );
}
