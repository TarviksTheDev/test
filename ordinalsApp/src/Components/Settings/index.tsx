import PropTypes from 'prop-types';
//
import ThemeContrast from './ThemeContrast';
import ThemeRtlLayout from './ThemeRtlLayout';
import ThemeColorPresets from './ThemeColorPresets';

// ----------------------------------------------------------------------

ThemeSettings.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function ThemeSettings({ children }:any) {
  return (
    <ThemeColorPresets>
      <ThemeContrast>
          <ThemeRtlLayout>
            {children}
            {/* <SettingsDrawer /> */}
          </ThemeRtlLayout>
      </ThemeContrast>
    </ThemeColorPresets>
  );
}
