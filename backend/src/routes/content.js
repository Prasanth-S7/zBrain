import express from 'express';
import { Content } from '../../db/schema.js';
import { loginMiddleware } from '../middleware/loginMiddlware.js';

const contentRouter = express.Router();

contentRouter.post('/', loginMiddleware, async (req, res) => {
    try {
        const { title, description, type, link, shareable, tags } = req.body;

        if (!['article', 'video', 'document', 'tweet', 'other'].includes(type)) {
            return res.status(400).json({ message: 'Invalid content type' });
        }

        const validTags = [
            'technology', 'business', 'finance', 'health',
            'entertainment', 'sports', 'science', 'education',
            'travel', 'lifestyle', 'other'
        ];

        let processedTags = [];
        if (tags && Array.isArray(tags)) {
            processedTags = tags.filter(tag => validTags.includes(tag));
        }

        const newContent = new Content({
            title,
            description,
            type,
            link,
            shareable: shareable || false,
            author: req.user.id,
            tags: processedTags
        });

        const savedContent = await newContent.save();

        return res.status(200).json({
            message: 'Content created successfully',
            content: savedContent
        });

    } catch (error) {
        console.error('Error creating content:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

contentRouter.get('/', loginMiddleware, async (req, res) => {
    try {
        const content = await Content.find({ author: req.user.id }).select('-author');
        return res.status(200).json({ message: 'Content fetched successfully', content});
    } catch (error) {
        console.error('Error fetching content:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

contentRouter.get('/:type', loginMiddleware, async (req, res) => {
    try {
        const type = req.params.type;
        if (!['article', 'video', 'document', 'tweet', 'other'].includes(type)) {
            return res.status(400).json({ message: 'Invalid content type' });
        }
        const content = await Content.find({ type: type }).select('-author');
        return res.status(200).json({ message: 'Content fetched successfully', content});
    } catch (error) {
        console.error('Error fetching content:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

contentRouter.post('/delete/:id', loginMiddleware, async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }

        if (content.author.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this content' });
        }

        await content.remove();
        return res.status(200).json({ message: 'Content deleted successfully' });
    } catch (error) {
        console.error('Error deleting content:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default contentRouter;
