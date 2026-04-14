/**
 * Repository for chat messages data access
 */

import { getDatabase, DatabaseConnection } from '../db/sqlite';
import { ChatMessage } from '../models/chatMessage';
import { handleDatabaseError } from '../utils/errors';
import { buildInsertSQL, objectToCamelCase, mapDatabaseRows, DatabaseRow } from '../utils/sql';

export class ChatMessagesRepository {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  /**
   * Get recent messages ordered oldest-first
   */
  async findRecent(limit: number = 50): Promise<ChatMessage[]> {
    try {
      const rows = await this.db.all<DatabaseRow>(
        'SELECT * FROM chat_messages ORDER BY created_at DESC LIMIT ?',
        [limit],
      );
      return mapDatabaseRows<ChatMessage>(rows).reverse();
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Create a new chat message
   */
  async create(message: Omit<ChatMessage, 'messageId' | 'createdAt'>): Promise<ChatMessage> {
    try {
      const { sql, values } = buildInsertSQL('chat_messages', message);
      const result = await this.db.run(sql, values);

      const createdMessage = await this.findById(result.lastID || 0);
      if (!createdMessage) {
        throw new Error('Failed to retrieve created message');
      }

      return createdMessage;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Get message by ID
   */
  async findById(id: number): Promise<ChatMessage | null> {
    try {
      const row = await this.db.get<DatabaseRow>(
        'SELECT * FROM chat_messages WHERE message_id = ?',
        [id],
      );
      return row ? objectToCamelCase<ChatMessage>(row) : null;
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}

// Factory function to create repository instance
export async function createChatMessagesRepository(
  isTest: boolean = false,
): Promise<ChatMessagesRepository> {
  const db = await getDatabase(isTest);
  return new ChatMessagesRepository(db);
}

// Singleton instance for default usage
let chatMessagesRepo: ChatMessagesRepository | null = null;

export async function getChatMessagesRepository(isTest: boolean = false): Promise<ChatMessagesRepository> {
  const isTestEnv = isTest || process.env.NODE_ENV === 'test' || process.env.VITEST === 'true';
  if (isTestEnv) {
    return createChatMessagesRepository(true);
  }
  if (!chatMessagesRepo) {
    chatMessagesRepo = await createChatMessagesRepository(false);
  }
  return chatMessagesRepo;
}
