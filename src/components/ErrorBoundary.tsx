import React, { ReactNode } from "react";

/**
 * Props para o Error Boundary
 */
interface ErrorBoundaryProps {
  children: ReactNode;
}

/**
 * Estado do Error Boundary
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Componente Error Boundary que captura erros em componentes filhos
 * Exibe um UI alternativo quando um erro é capturado
 */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  /**
   * Atualiza o estado quando um erro é capturado
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Log do erro para serviços de monitoramento
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  /**
   * Reseta o estado do error boundary
   */
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f8f9fa",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "40px",
              maxWidth: "500px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h1 style={{ color: "#dc3545", marginBottom: "20px" }}>
              ❌ Algo deu errado
            </h1>
            <p
              style={{ color: "#666", marginBottom: "20px", lineHeight: "1.6" }}
            >
              Desculpe, ocorreu um erro inesperado. Por favor, tente recarregar
              a página ou volte em breve.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details
                style={{
                  marginBottom: "20px",
                  padding: "10px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                  borderLeft: "3px solid #dc3545",
                }}
              >
                <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                  Detalhes do erro (apenas em desenvolvimento)
                </summary>
                <pre
                  style={{
                    marginTop: "10px",
                    fontSize: "12px",
                    overflow: "auto",
                    color: "#333",
                  }}
                >
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={this.handleReset}
                style={{
                  padding: "10px 20px",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Tentar novamente
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                style={{
                  padding: "10px 20px",
                  background: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Ir para home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
