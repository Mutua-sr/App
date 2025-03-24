import apiService, { 
  apolloClient, 
  videoCallService, 
  chatService, 
  connectionService
} from '../apiService';
import { Socket } from 'socket.io-client';
import { ApolloClient } from '@apollo/client';

const { TokenService } = apiService;

// Mock socket.io-client
const mockSocket = {
  on: jest.fn(),
  emit: jest.fn(),
  off: jest.fn(),
  disconnect: jest.fn(),
  connected: true,
  // Add other required socket.io properties
  volatile: {},
  timeout: jest.fn(),
  binary: jest.fn()
};

jest.mock('socket.io-client', () => ({
  io: jest.fn(() => mockSocket),
  Socket: { prototype: mockSocket }
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    // Reset SocketManager instance before each test
    connectionService.disconnect();
    const { SocketManager } = require('../apiService');
    SocketManager.resetInstance();
    // Reconnect to get a fresh socket instance
    connectionService.connect();
  });

  afterEach(() => {
    connectionService.disconnect();
  });

  describe('TokenService', () => {
    it('should manage tokens in localStorage', () => {
      const testToken = 'test-token';
      
      TokenService.setToken(testToken);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('token', testToken);
      
      localStorageMock.getItem.mockReturnValue(testToken);
      expect(TokenService.getToken()).toBe(testToken);
      
      TokenService.removeToken();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
      
      localStorageMock.getItem.mockReturnValue(testToken);
      expect(TokenService.isAuthenticated()).toBe(true);
      
      localStorageMock.getItem.mockReturnValue(null);
      expect(TokenService.isAuthenticated()).toBe(false);
    });
  });

  describe('Apollo Client', () => {
    it('should be properly configured', () => {
      expect(apolloClient).toBeInstanceOf(ApolloClient);
      expect(apolloClient.defaultOptions).toBeDefined();
      expect(apolloClient.defaultOptions.watchQuery?.fetchPolicy).toBe('cache-and-network');
      expect(apolloClient.defaultOptions.query?.fetchPolicy).toBe('network-only');
    });
  });

  describe('Video Call Service', () => {
    const mockOffer = { type: 'offer', sdp: 'test-sdp' } as RTCSessionDescriptionInit;
    const mockAnswer = { type: 'answer', sdp: 'test-sdp' } as RTCSessionDescriptionInit;
    const mockCandidate = { candidate: 'test-candidate' } as RTCIceCandidate;
    const targetId = 'test-target';

    it('should send video call signals', () => {
      videoCallService.sendOffer(mockOffer, targetId);
      expect(mockSocket.emit).toHaveBeenCalledWith('video:offer', {
        offer: mockOffer,
        targetId
      });

      videoCallService.sendAnswer(mockAnswer, targetId);
      expect(mockSocket.emit).toHaveBeenCalledWith('video:answer', {
        answer: mockAnswer,
        targetId
      });

      videoCallService.sendIceCandidate(mockCandidate, targetId);
      expect(mockSocket.emit).toHaveBeenCalledWith('video:ice-candidate', {
        candidate: mockCandidate,
        targetId
      });

      videoCallService.sendHangup(targetId);
      expect(mockSocket.emit).toHaveBeenCalledWith('video:hangup', {
        targetId
      });
    });

    it('should handle video call events', () => {
      const mockCallback = jest.fn();

      videoCallService.onVideoOffer(mockCallback);
      expect(mockSocket.on).toHaveBeenCalledWith('video:offer', expect.any(Function));

      videoCallService.onVideoAnswer(mockCallback);
      expect(mockSocket.on).toHaveBeenCalledWith('video:answer', expect.any(Function));

      videoCallService.onIceCandidate(mockCallback);
      expect(mockSocket.on).toHaveBeenCalledWith('video:ice-candidate', expect.any(Function));

      videoCallService.onHangup(mockCallback);
      expect(mockSocket.on).toHaveBeenCalledWith('video:hangup', expect.any(Function));
    });
  });

  describe('Chat Service', () => {
    const mockMessage = {
      content: 'test message',
      communityId: 'test-community',
      classroomId: 'test-classroom'
    };

    it('should send chat messages', () => {
      chatService.sendMessage(
        mockMessage.content,
        mockMessage.communityId,
        mockMessage.classroomId
      );

      expect(mockSocket.emit).toHaveBeenCalledWith('chat:message', mockMessage);
    });

    it('should handle chat message events', () => {
      const mockCallback = jest.fn();

      chatService.onMessage(mockCallback);
      expect(mockSocket.on).toHaveBeenCalledWith('chat:message', expect.any(Function));

      chatService.offMessage(mockCallback);
      expect(mockSocket.off).toHaveBeenCalledWith('chat:message', expect.any(Function));
    });
  });

  describe('Connection Service', () => {
    it('should manage socket connection', () => {
      connectionService.connect();
      expect(mockSocket.on).toHaveBeenCalledWith('connect', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('connect_error', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('disconnect', expect.any(Function));

      connectionService.disconnect();
      expect(mockSocket.disconnect).toHaveBeenCalled();
    });

    it('should check authentication status', () => {
      localStorageMock.getItem.mockReturnValue('test-token');
      expect(connectionService.isAuthenticated()).toBe(true);

      localStorageMock.getItem.mockReturnValue(null);
      expect(connectionService.isAuthenticated()).toBe(false);
    });
  });
});