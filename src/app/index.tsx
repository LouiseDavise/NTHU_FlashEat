import { Redirect, useRouter, type Href } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { AppHeader } from '@/components/app-header';
import { Pressable } from '@/components/pressable';
import { RoleCard } from '@/components/role-card';
import { TextField } from '@/components/text-field';
import { STALLS } from '@/features/flasheat/data/seed';
import { useFlashEatStore } from '@/features/flasheat/store/flasheat-store';
import { useNames, useT } from '@/i18n/use-t';
import { Segmented } from '@/components/segmented';
import { cn } from '@/lib/cn';

export default function WelcomeScreen() {
  const { t } = useT();
  const nameOf = useNames();
  const router = useRouter();
  const role = useFlashEatStore((s) => s.session.role);
  const loginCustomer = useFlashEatStore((s) => s.loginCustomer);
  const loginTenant = useFlashEatStore((s) => s.loginTenant);

  const [kind, setKind] = useState<'Student' | 'Faculty'>('Student');
  const [nthuId, setNthuId] = useState('112000123');
  const [guestName, setGuestName] = useState('Alex Chen');
  const [phone, setPhone] = useState('0912-345-678');
  const [stallId, setStallId] = useState(STALLS[0].id);
  const [pin, setPin] = useState('1234');
  const [tried, setTried] = useState<'student' | 'guest' | 'tenant' | null>(null);

  if (role === 'customer') return <Redirect href={'/customer' as Href} />;
  if (role === 'tenant') return <Redirect href={'/tenant' as Href} />;

  const continueStudent = () => {
    setTried('student');
    if (!nthuId.trim()) return;
    loginCustomer({ type: kind, name: nthuId.trim() });
    router.replace('/customer' as Href);
  };
  const continueGuest = () => {
    setTried('guest');
    if (!guestName.trim() || !phone.trim()) return;
    loginCustomer({ type: 'Guest', name: guestName.trim() });
    router.replace('/customer' as Href);
  };
  const continueTenant = () => {
    setTried('tenant');
    if (!/^\d{4}$/.test(pin)) return;
    loginTenant(stallId);
    router.replace('/tenant' as Href);
  };

  return (
    <View className="flex-1 bg-background">
      <AppHeader hideControls />
      <View className="bg-accent px-4 pb-6 pt-2">
        <Text className="text-title font-bold text-accent-foreground">{t('app.slogan')}</Text>
      </View>
      <ScrollView className="flex-1" contentContainerClassName="px-4 pt-6 pb-safe-offset-4 gap-4" keyboardShouldPersistTaps="handled">
        <Text className="text-section font-bold text-foreground">{t('welcome.chooseRole')}</Text>

        <RoleCard icon="school-outline" title={t('welcome.studentTitle')} description={t('welcome.studentDesc')}>
          <Segmented
            values={['Student', 'Faculty'] as const}
            labels={[t('welcome.student'), t('welcome.faculty')]}
            value={kind}
            onChange={setKind}
          />
          <TextField
            label={t('welcome.idLabel')}
            value={nthuId}
            onChangeText={setNthuId}
            keyboardType="number-pad"
            error={tried === 'student' && !nthuId.trim() ? t('welcome.fieldError') : null}
          />
          <ActionButton label={t('welcome.continue')} onPress={continueStudent} />
        </RoleCard>

        <RoleCard icon="person-outline" title={t('welcome.guestTitle')} description={t('welcome.guestDesc')}>
          <TextField
            label={t('welcome.nameLabel')}
            value={guestName}
            onChangeText={setGuestName}
            error={tried === 'guest' && !guestName.trim() ? t('welcome.fieldError') : null}
          />
          <TextField
            label={t('welcome.phoneLabel')}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            error={tried === 'guest' && !phone.trim() ? t('welcome.fieldError') : null}
          />
          <ActionButton label={t('welcome.continue')} onPress={continueGuest} />
        </RoleCard>

        <RoleCard icon="restaurant-outline" title={t('welcome.tenantTitle')} description={t('welcome.tenantDesc')}>
          <Text className="text-caption font-semibold text-muted">{t('welcome.stallLabel')}</Text>
          <View className="flex-row flex-wrap gap-2">
            {STALLS.map((s) => {
              const on = s.id === stallId;
              return (
                <Pressable
                  key={s.id}
                  onPress={() => setStallId(s.id)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: on }}
                  className={cn('min-h-11 justify-center rounded-full border px-4', on ? 'border-accent bg-accent' : 'border-border bg-background')}
                >
                  <Text className={cn('text-body font-semibold', on ? 'text-accent-foreground' : 'text-foreground')}>{nameOf(s).primary}</Text>
                </Pressable>
              );
            })}
          </View>
          <TextField
            label={t('welcome.pinLabel')}
            value={pin}
            onChangeText={(v) => setPin(v.replace(/\D/g, '').slice(0, 4))}
            keyboardType="number-pad"
            secureTextEntry
            error={tried === 'tenant' && !/^\d{4}$/.test(pin) ? t('welcome.pinError') : null}
          />
          <Text className="text-caption text-muted">{t('welcome.pinHint')}</Text>
          <ActionButton label={t('welcome.continue')} onPress={continueTenant} />
        </RoleCard>
      </ScrollView>
    </View>
  );
}
