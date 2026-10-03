import { Modal, Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { Icon } from '@/components/icon';
import { Pressable } from '@/components/pressable';
import { useT } from '@/i18n/use-t';

interface SlotFullSheetProps {
  visible: boolean;
  nextTime: string | null;
  onPick: (time: string) => void;
  onClose: () => void;
}

export function SlotFullSheet({ visible, nextTime, onPick, onClose }: SlotFullSheetProps) {
  const { t } = useT();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end">
        <Pressable onPress={onClose} accessibilityLabel={t('menu.close')} className="flex-1 bg-foreground opacity-30" />
        <View className="gap-4 rounded-t-3xl bg-background p-6 pb-safe-offset-4">
          <View className="flex-row items-center gap-3">
            <Icon name="time-outline" size={28} tone="danger" />
            <Text className="flex-1 text-section font-bold text-foreground">{t('menu.slotFullTitle')}</Text>
          </View>
          {nextTime ? (
            <>
              <Text className="text-emph text-foreground">{t('menu.slotFullBody', { time: nextTime })}</Text>
              <ActionButton label={t('menu.pickSlot', { time: nextTime })} onPress={() => onPick(nextTime)} />
            </>
          ) : (
            <Text className="text-emph text-foreground">{t('menu.allFull')}</Text>
          )}
          <ActionButton label={t('menu.close')} variant="secondary" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}
