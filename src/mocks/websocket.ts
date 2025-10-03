/* eslint-disable @typescript-eslint/no-explicit-any */
type WebSocketEventType =
  | "invoice_created"
  | "invoice_updated"
  | "invoice_deleted"
  | "payment_received"
  | "invoice_sent"
  | "reminder_triggered";

// include 'connection' as an allowed event name
type WebSocketEvent = WebSocketEventType | "connection";

interface WebSocketMessage {
  type: WebSocketEvent;
  data: any;
  timestamp: string;
}

type WebSocketCallback = (message: WebSocketMessage) => void;

class MockWebSocketService {
  private listeners: Set<WebSocketCallback> = new Set();
  private isConnected: boolean = false;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  private simulationInterval: ReturnType<typeof setTimeout> | null = null;

  connect(): void {
    if (this.isConnected) {
      console.log("[MockWS] Already connected");
      return;
    }

    console.log("[MockWS] Connecting...");

    // Simulate connection delay
    setTimeout(() => {
      this.isConnected = true;
      console.log("[MockWS] Connected successfully");

      // Notify all listeners of connection
      this.emit("connection", { connected: true });

      // Start simulating random events for demo purposes
      this.startSimulation();
    }, 1000);
  }

  disconnect(): void {
    if (!this.isConnected) return;

    console.log("[MockWS] Disconnecting...");
    this.isConnected = false;

    if (this.simulationInterval) {
      clearTimeout(this.simulationInterval);
      this.simulationInterval = null;
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  on(callback: WebSocketCallback): () => void {
    this.listeners.add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }

  private emit(type: WebSocketEvent, data: any): void {
    const message: WebSocketMessage = {
      type,
      data,
      timestamp: new Date().toISOString(),
    };

    this.listeners.forEach((callback) => {
      try {
        callback(message);
      } catch (error) {
        console.error("[MockWS] Error in listener:", error);
      }
    });
  }

  // Manually trigger an event (for testing)
  trigger(type: WebSocketEventType, data: any): void {
    if (!this.isConnected) {
      console.warn("[MockWS] Cannot trigger event - not connected");
      return;
    }
    this.emit(type, data);
  }

  private startSimulation(): void {
    // Simulate random real-time events every 15-30 seconds
    const scheduleNext = () => {
      const delay = Math.random() * 15000 + 15000; // 15-30 seconds

      this.simulationInterval = setTimeout(() => {
        if (!this.isConnected) return;

        // Randomly pick an event to simulate
        const events: Array<{ type: WebSocketEventType; data: any }> = [
          {
            type: "invoice_created",
            data: {
              invoiceId: `INV-${Math.random().toString(36).slice(2, 11)}`,
              customer: "New Customer",
              amount: Math.floor(Math.random() * 100000) + 10000,
              status: "DRAFT",
            },
          },
          {
            type: "payment_received",
            data: {
              invoiceId: `INV-${Math.random().toString(36).slice(2, 11)}`,
              amount: Math.floor(Math.random() * 50000) + 5000,
              paymentMethod: "Bank Transfer",
            },
          },
          {
            type: "invoice_sent",
            data: {
              invoiceId: `INV-${Math.random().toString(36).slice(2, 11)}`,
              recipient: "customer@example.com",
            },
          },
          {
            type: "reminder_triggered",
            data: {
              invoiceId: `INV-${Math.random().toString(36).slice(2, 11)}`,
              reminderType: "24 hrs before due date",
            },
          },
        ];

        const randomEvent = events[Math.floor(Math.random() * events.length)];
        this.emit(randomEvent.type, randomEvent.data);

        scheduleNext();
      }, delay);
    };

    scheduleNext();
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

// Export singleton instance
export const mockWebSocket = new MockWebSocketService();
