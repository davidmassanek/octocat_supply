/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: API endpoints for the cat chat room
 */

/**
 * @swagger
 * /api/chat/messages:
 *   get:
 *     summary: Returns recent chat messages
 *     tags: [Chat]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Maximum number of messages to return
 *     responses:
 *       200:
 *         description: List of recent chat messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChatMessage'
 *   post:
 *     summary: Send a new chat message
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senderName
 *               - senderEmail
 *               - content
 *             properties:
 *               senderName:
 *                 type: string
 *               senderEmail:
 *                 type: string
 *               content:
 *                 type: string
 *                 maxLength: 500
 *     responses:
 *       201:
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatMessage'
 *       400:
 *         description: Invalid input
 */

import express from 'express';
import { getChatMessagesRepository } from '../repositories/chatMessagesRepo';

const router = express.Router();

// Get recent messages
router.get('/messages', async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit as string) || 50, 1), 100);
    const repo = await getChatMessagesRepository();
    const messages = await repo.findRecent(limit);
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

// Send a new message
router.post('/messages', async (req, res, next) => {
  try {
    const { senderName, senderEmail, content } = req.body;

    if (!senderName || !senderName.trim()) {
      return res.status(400).json({ error: 'senderName is required' });
    }
    if (!senderEmail || !senderEmail.trim()) {
      return res.status(400).json({ error: 'senderEmail is required' });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'content is required' });
    }
    if (content.length > 500) {
      return res.status(400).json({ error: 'content must be 500 characters or fewer' });
    }

    const repo = await getChatMessagesRepository();
    const newMessage = await repo.create({
      senderName: senderName.trim(),
      senderEmail: senderEmail.trim(),
      content: content.trim(),
    });
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
});

export default router;
