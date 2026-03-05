import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import LogosLight from './LogosLight';
import LogosDark from './LogosDark';
import { AssetSize } from '@/types';
import { LogoName } from './types';
import { SvgImageElement } from '@/components/Icon/SvgImageElement';
import type { ThemeName } from '@/theme/theme.types';
import { THEMES } from '@/theme/theme.core';
import {
  createAssetResolver,
  type AssetAlias,
  type AssetDeprecatedName,
} from '@/components/Assets/config';

const resolveLogoName = createAssetResolver<LogoName>();

export { resolveLogoName };

export interface LogoProps extends SVGAttributes<SVGElement> {
  name: LogoName | AssetAlias | AssetDeprecatedName;
  theme?: ThemeName;
  size?: AssetSize;
}

const Logo = ({ name, theme, size, ...props }: LogoProps) => {
  const { name: themeName } = useTheme();
  const resolvedName = resolveLogoName(name);
  const resolvedTheme: ThemeName = theme ?? (themeName as ThemeName) ?? THEMES.Light;
  const Component =
    resolvedTheme === THEMES.Light ? LogosLight[resolvedName] : LogosDark[resolvedName];

  if (!Component) {
    return null;
  }

  const ThemedLogo = (svgProps: SVGAttributes<SVGElement>) => (
    <Component
      theme={resolvedTheme}
      {...svgProps}
    />
  );

  return (
    <SvgImageElement
      as={ThemedLogo}
      $size={size}
      role="img"
      aria-label={resolvedName}
      {...props}
    />
  );
};

Logo.displayName = 'Logo';

export { Logo };
