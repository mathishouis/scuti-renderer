import { benchmark } from './Benchmark';

function formatDate(date: Date): string {
  return String(date.getHours()) + ':' + String(date.getMinutes()) + ':' + String(date.getSeconds());
}

function format(title: string, message: string, date: Date, backgroundColor: string, textColor: string): void {
  console.log(
    `%c ${formatDate(date)} %c ${title} %c ${message} `,
    'background: #FFFFFF; color: #000000;',
    'background: #000000;',
    `background: ${backgroundColor}; color: ${textColor};`,
  );
}

function log(title: string, message: string): void {
  format(title, message, new Date(), '#0C567C', '#FFFFFF');
}

function warn(title: string, message: string): void {
  format(title, message, new Date(), '#FFD100', '#000000');
}

function error(title: string, message: string): void {
  format(title, message, new Date(), '#E86C5D', '#FFFFFF');
}

function perf(title: string, tag: string): void {
  format('⏱️ BENCHMARK', `${title} initialized in ${benchmark(tag)}ms`, new Date(), '#093a52', '#FFFFFF');
}

export { log, warn, error, perf };
