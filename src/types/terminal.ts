export interface TerminalResponse {
  text: string;
  type?: 'link' | 'text' | 'error' | 'success';
  href?: string;
}

export interface Command {
  text: string;
  response?: Array<string | TerminalResponse>;
  type: 'command' | 'response' | 'text';
}

export type CommandResponse = Array<string | TerminalResponse>;
