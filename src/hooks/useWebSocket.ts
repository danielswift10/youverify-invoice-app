/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useWebSocket.ts
import { useEffect, useState, useCallback } from 'react';
import { mockWebSocket } from '../mocks/websocket';

interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: string;
}

interface UseWebSocketReturn {
  lastMessage: WebSocketMessage | null;
  isConnected: boolean;
  sendMessage: (type: string, data: any) => void;
}

export const useWebSocket = (autoConnect: boolean = true): UseWebSocketReturn => {
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!autoConnect) return;

    // Connect to WebSocket
    mockWebSocket.connect();
    setIsConnected(true);

    // Subscribe to messages
    const unsubscribe = mockWebSocket.on((message) => {
      setLastMessage(message);
    });

    // Cleanup on unmount
    return () => {
      unsubscribe();
      mockWebSocket.disconnect();
      setIsConnected(false);
    };
  }, [autoConnect]);

  const sendMessage = useCallback((type: string, data: any) => {
    mockWebSocket.trigger(type as any, data);
  }, []);

  return {
    lastMessage,
    isConnected,
    sendMessage,
  };
};