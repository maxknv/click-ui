import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { AssetSize } from '@/types';
import { PaymentName } from './types';
import PaymentsLight from './PaymentsLight';
import PaymentsDark from './PaymentsDark';
import { SvgImageElement } from '@/components/Icon/SvgImageElement';
import type { ThemeName } from '@/theme/theme.types';
import { THEMES } from '@/theme/theme.core';
import {
  createAssetResolver,
  type AssetAlias,
  type AssetDeprecatedName,
} from '@/components/Assets/config';

const resolvePaymentName = createAssetResolver<PaymentName>();

export { resolvePaymentName };

export interface PaymentProps extends SVGAttributes<SVGElement> {
  name: PaymentName | AssetAlias | AssetDeprecatedName;
  theme?: ThemeName;
  size?: AssetSize;
}

const Payment = ({ name, theme, size, ...props }: PaymentProps) => {
  const { name: themeName } = useTheme();
  const resolvedName = resolvePaymentName(name);
  const resolvedTheme: ThemeName = theme ?? (themeName as ThemeName) ?? THEMES.Light;
  const Component =
    resolvedTheme === THEMES.Light
      ? PaymentsLight[resolvedName]
      : PaymentsDark[resolvedName];

  if (!Component) {
    return null;
  }

  const ThemedPayment = (svgProps: SVGAttributes<SVGElement>) => (
    <Component
      theme={resolvedTheme}
      {...svgProps}
    />
  );

  return (
    <SvgImageElement
      as={ThemedPayment}
      $size={size}
      role="img"
      aria-label={resolvedName}
      {...props}
    />
  );
};

Payment.displayName = 'Payment';

export { Payment };
