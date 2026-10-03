import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import qrcode from 'qrcode-generator';
import { View } from 'react-native';

interface QrCodeProps {
  value: string;
  size?: number;
}

export function QrCode({ value, size = 200 }: QrCodeProps) {
  const qr = qrcode(0, 'M');
  qr.addData(value);
  qr.make();
  const n = qr.getModuleCount();
  const cell = size / (n + 2);
  const path = Skia.Path.Make();
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (qr.isDark(r, c)) path.addRect(Skia.XYWHRect((c + 1) * cell, (r + 1) * cell, cell + 0.4, cell + 0.4));
    }
  }
  return (
    <View accessibilityLabel={`QR ${value}`} style={{ width: size, height: size }}>
      <Canvas style={{ width: size, height: size }}>
        <Path path={path} color="black" />
      </Canvas>
    </View>
  );
}
