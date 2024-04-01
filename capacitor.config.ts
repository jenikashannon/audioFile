import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.audiofile',
  appName: 'audiofile',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
