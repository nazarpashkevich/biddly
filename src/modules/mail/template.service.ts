import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

@Injectable()
export class TemplateService {
  private templatesPath = path.join(__dirname, 'templates');

  constructor() {
    this.registerLayouts();
  }

  async render(
    template: string,
    variables: Record<string, any>
  ): Promise<string> {
    const templatePath = path.join(this.templatesPath, `${template}.hbs`);

    // check if template exists
    try {
      await fs.access(templatePath);
    } catch {
      throw new Error(`Cannot access template ${template}`);
    }

    const templateContent = await fs.readFile(templatePath, 'utf-8');
    const rendered = Handlebars.compile(templateContent);

    return rendered(variables);
  }

  private async registerLayouts(): Promise<void> {
    const layoutPath = path.join(this.templatesPath, 'layouts', 'base.hbs');

    // check if layout exists
    try {
      await fs.access(layoutPath);
    } catch {
      throw new Error(`Cannot access layout`);
    }

    const layoutContent = await fs.readFile(layoutPath, 'utf-8');

    Handlebars.registerPartial('layout', layoutContent);
  }
}
