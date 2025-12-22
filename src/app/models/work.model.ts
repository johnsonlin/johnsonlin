import { PROJECT_IMAGE_WIDTH } from '../app.constants';

export class Work {
  global_ID!: string;
  title = '';
  attachments?: Record<string, { thumbnails: { medium: string } }>;
  featured_image?: string;
  excerpt = '';
  content = '';

  constructor(project: Work) {
    Object.assign(this, project);
  }

  getImage() {
    const featuredImage = this.featured_image
      ? `${this.featured_image}?w=${PROJECT_IMAGE_WIDTH}`
      : null;
    const attachments = this.attachments || {};
    const firstAttachment = attachments[Object.keys(attachments)[0]];

    return featuredImage || firstAttachment.thumbnails.medium || null;
  }
}
