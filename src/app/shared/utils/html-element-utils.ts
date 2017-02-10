export class HtmlElementUtils {
  constructor (elemNode: HTMLNode) {
    this.elemNode = elemNode;
  }

  getElementTextContent (selector: string) {
    return this.elemNode.querySelector(selector).textContent;
  }
}
