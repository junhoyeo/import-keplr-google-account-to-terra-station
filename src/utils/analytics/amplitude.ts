import { AnalyticsEvent } from './events';

const AMPLITUDE_API_KEY = 'bae81825bf03d272b5082162f5a00b40';
const isBrowser = typeof window !== 'undefined';

export async function getAmplitude() {
  if (isBrowser) {
    const amplitude = await import('amplitude-js');
    return amplitude.default.getInstance();
  }
  return undefined;
}

export async function initialize() {
  const amplitude = await getAmplitude();
  amplitude?.init(AMPLITUDE_API_KEY);
  amplitude?.setUserProperties({
    is_debug: false,
  });
}

export async function logEvent<TName extends keyof AnalyticsEvent>(
  name: TName,
  properties: AnalyticsEvent[TName],
) {
  const eventProperties = {
    referrer: document.referrer || undefined,
    ...(properties as unknown as object),
  };
  // if (Config.ENVIRONMENT !== 'production') {
  console.log('[Analytics]', name, eventProperties);
  // }
  const amplitude = await getAmplitude();
  amplitude?.logEvent(name, eventProperties);
}
