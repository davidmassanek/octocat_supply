/**
 * @swagger
 * components:
 *   schemas:
 *     ChatMessage:
 *       type: object
 *       required:
 *         - messageId
 *         - senderName
 *         - senderEmail
 *         - content
 *         - createdAt
 *       properties:
 *         messageId:
 *           type: integer
 *           description: The unique identifier for the message
 *         senderName:
 *           type: string
 *           description: Display name of the message sender
 *         senderEmail:
 *           type: string
 *           description: Email address of the message sender
 *         content:
 *           type: string
 *           description: The message content
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the message was created
 */
export interface ChatMessage {
  messageId: number;
  senderName: string;
  senderEmail: string;
  content: string;
  createdAt: string;
}
