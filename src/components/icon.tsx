import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useThemeColor } from 'heroui-native';

interface IconProps {
  name: ComponentProps<typeof Ionicons>['name'];
  size?: number;
  tone?: 'accent' | 'muted' | 'foreground' | 'white' | 'success' | 'danger';
}

export function Icon({ name, size = 22, tone = 'foreground' }: IconProps) {
  const accent = useThemeColor('accent');
  const muted = useThemeColor('muted');
  const foreground = useThemeColor('foreground');
  const success = useThemeColor('success');
  const danger = useThemeColor('danger');
  const accentForeground = useThemeColor('accent-foreground');
  const colors = { accent, muted, foreground, success, danger, white: accentForeground };
  return <Ionicons name={name} size={size} color={colors[tone]} />;
}
