import { NextRequest, NextResponse } from 'next/server';

interface MCPRequest {
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: {
    arguments?: any;
  };
}

interface MCPResponse {
  jsonrpc: "2.0";
  id: string | number;
  result?: any;
  error?: {
    code: number;
    message: string;
  };
}

let initialized = false;
const tools = [
  {
    name: "json_to_yaml",
    description: "Convert JSON to YAML format",
    inputSchema: {
      type: "object",
      properties: {
        json: {
          type: "string",
          description: "JSON string to convert"
        }
      },
      required: ["json"]
    }
  },
  {
    name: "yaml_to_json",
    description: "Convert YAML to JSON format",
    inputSchema: {
      type: "object",
      properties: {
        yaml: {
          type: "string",
          description: "YAML string to convert"
        }
      },
      required: ["yaml"]
    }
  },
  {
    name: "json_validate",
    description: "Validate JSON format",
    inputSchema: {
      type: "object",
      properties: {
        json: {
          type: "string",
          description: "JSON string to validate"
        }
      },
      required: ["json"]
    }
  },
  {
    name: "json_prettify",
    description: "Prettify JSON with proper indentation",
    inputSchema: {
      type: "object",
      properties: {
        json: {
          type: "string",
          description: "JSON string to prettify"
        },
        spaces: {
          type: "number",
          description: "Number of spaces for indentation",
          default: 2
        }
      },
      required: ["json"]
    }
  }
];

export async function POST(request: NextRequest) {
  let requestId: number | string = 0;

  try {
    const body: MCPRequest = await request.json();
    requestId = body.id;

    if (body.jsonrpc !== "2.0") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id: requestId,
        error: {
          code: -32600,
          message: "Invalid Request"
        }
      } as MCPResponse, { status: 400 });
    }

    const response: MCPResponse = {
      jsonrpc: "2.0",
      id: requestId
    };

    switch (body.method) {
      case "initialize":
        response.result = {
          protocolVersion: "2024-11-05",
          capabilities: {
            tools: {}
          }
        };
        initialized = true;
        break;

      case "tools/list":
        response.result = { tools };
        break;

      case "tools/call":
        if (!body.params?.arguments) {
          response.error = {
            code: -32602,
            message: "Invalid params: arguments required"
          };
          break;
        }

        const { arguments: args } = body.params;

        try {
          switch (body.params.name) {
            case "json_to_yaml":
              try {
                const parsed = JSON.parse(args.json);
                const yaml = require('yaml').stringify(parsed);
                response.result = { result: yaml };
              } catch (error) {
                response.error = {
                  code: -32602,
                  message: "Invalid JSON"
                };
              }
              break;

            case "yaml_to_json":
              try {
                const parsed = require('yaml').parse(args.yaml);
                response.result = { result: JSON.stringify(parsed, null, 2) };
              } catch (error) {
                response.error = {
                  code: -32602,
                  message: "Invalid YAML"
                };
              }
              break;

            case "json_validate":
              try {
                JSON.parse(args.json);
                response.result = { valid: true, message: "JSON is valid" };
              } catch (error) {
                response.result = {
                  valid: false,
                  message: "Invalid JSON",
                  error: error.message
                };
              }
              break;

            case "json_prettify":
              try {
                const parsed = JSON.parse(args.json);
                const prettified = JSON.stringify(parsed, null, args.spaces || 2);
                response.result = { result: prettified };
              } catch (error) {
                response.error = {
                  code: -32602,
                  message: "Invalid JSON"
                };
              }
              break;

            default:
              response.error = {
                code: -32601,
                message: `Unknown tool: ${body.params.name}`
              };
          }
        } catch (error) {
          response.error = {
            code: -32603,
            message: "Internal error"
          };
        }
        break;

      default:
        response.error = {
          code: -32601,
          message: `Method not found: ${body.method}`
        };
    }

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      jsonrpc: "2.0",
      id: requestId,
      error: {
        code: -32603,
        message: "Internal error"
      }
    } as MCPResponse, { status: 500 });
  }
}