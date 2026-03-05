import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { AssetSize } from '@/types';
import { FlagName } from './types';
export type { FlagName } from './types';
export type { SVGAssetProps } from '../../types';
import FlagsLight from './FlagsLight';
import FlagsDark from './FlagsDark';
import { SvgImageElement } from '@/components/Icon/SvgImageElement';
import type { ThemeName } from '@/theme/theme.types';
import { THEMES } from '@/theme/theme.core';
import {
  createAssetResolver,
  type AssetAlias,
  type AssetDeprecatedName,
} from '@/components/Assets/config';

const resolveFlagName = createAssetResolver<FlagName>();

export { resolveFlagName };

export interface FlagProps extends SVGAttributes<SVGElement> {
  name: FlagName | AssetAlias | AssetDeprecatedName;
  theme?: ThemeName;
  size?: AssetSize;
}

const Flag = ({ name, theme, size, ...props }: FlagProps) => {
  const { name: themeName } = useTheme();
  const resolvedName = resolveFlagName(name);
  const resolvedTheme: ThemeName = theme ?? (themeName as ThemeName) ?? THEMES.Light;
  const Component =
    resolvedTheme === THEMES.Dark ? FlagsLight[resolvedName] : FlagsDark[resolvedName];

  if (!Component) {
    return null;
  }

  const ThemedFlag = (svgProps: SVGAttributes<SVGElement>) => (
    <Component
      theme={resolvedTheme}
      {...svgProps}
    />
  );

  return (
    <SvgImageElement
      as={ThemedFlag}
      $size={size}
      role="img"
      aria-label={resolvedName}
      {...props}
    />
  );
};

Flag.displayName = 'Flag';

export { Flag };
