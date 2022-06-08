const detectLibc = require('detect-libc');

const env = process.env;

function get () {
  const arch = env.npm_config_arch || process.arch;
  console.log("arch",arch);
  const platform = env.npm_config_platform || process.platform;
  console.log("platform",platform);
  const libc = process.env.npm_config_libc ||
    /* istanbul ignore next */
    (detectLibc.isNonGlibcLinuxSync() ? detectLibc.familySync() : '');
  console.log("libc",libc);
  const libcId = platform !== 'linux' || libc === detectLibc.GLIBC ? '' : libc;
  console.log("libcId",libcId);

  const platformId = [`${platform}${libcId}`];

  if (arch === 'arm') {
    const fallback = process.versions.electron ? '7' : '6';
    console.log("fallback",fallback);
    console.log("env.npm_config_arm_version",env.npm_config_arm_version);
    console.log("process.config.variables.arm_version",process.config.variables.arm_version);
    platformId.push(`armv${env.npm_config_arm_version || process.config.variables.arm_version || fallback}`);
  } else if (arch === 'arm64') {
    platformId.push(`arm64v${env.npm_config_arm_version || '8'}`);
  } else {
    platformId.push(arch);
  }


  console.log(platformId);

  return platformId.join('-');
}

get()
