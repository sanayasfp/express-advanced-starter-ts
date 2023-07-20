interface Response {
  statusCode: number;
  success: boolean;
  message: string;
  data: Record<string | number, any>[];
  errors: Record<string, any>[]; // ValidatorError[];
  metaData: Record<string | number, any>;
}

export default Response;
