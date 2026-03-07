#!/usr/bin/env node
/**
 * Modal migration script v2 - handles edge cases better
 */
const fs = require('fs');
const path = require('path');

const files = process.argv.slice(2);
if (files.length === 0) { console.log('Usage: node migrate-modals.js <file1> ...'); process.exit(1); }

for (const filePath of files) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) { console.error(`File not found: ${fullPath}`); continue; }

  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;

  // Step 1: Add import if not already present
  if (!content.includes("Modal as CommonModal") && !content.includes("CommonModal")) {
    if (content.match(/} from '\.\.\/\.\.\/components\/UI';/)) {
      content = content.replace(
        /} from '\.\.\/\.\.\/components\/UI';/,
        ", Modal as CommonModal } from '../../components/UI';"
      );
    } else if (content.match(/from '\.\.\/\.\.\/components\/UI\//)) {
      const match = content.match(/import .+ from '\.\.\/\.\.\/components\/UI\/[^']+';/);
      if (match) {
        content = content.replace(match[0], match[0] + "\nimport { Modal as CommonModal } from '../../components/UI';");
      }
    } else {
      content = content.replace(
        "import styled from 'styled-components';",
        "import styled from 'styled-components';\nimport { Modal as CommonModal } from '../../components/UI';"
      );
    }
  }

  // Step 2: Remove styled modal components (robust multi-pass)
  const styledNames = ['ModalOverlay', 'Modal', 'ModalContent', 'ModalHeader', 'ModalTitle', 'CloseButton', 'ModalBody', 'ModalFooter'];
  for (const name of styledNames) {
    // Match const Name = styled.xxx<...>`...`; with possible multiline
    const regex = new RegExp('\\nconst ' + name + ' = styled\\.[a-z]+(?:<[^>]*>)?\\s*`[\\s\\S]*?`;', 'g');
    content = content.replace(regex, '');
  }
  // Also remove // Modal ... comment lines that are now orphaned
  content = content.replace(/\n\/\/ Modal styled components\n/g, '\n');
  content = content.replace(/\n\/\/ Modal components[^\n]*\n/g, '\n');
  content = content.replace(/\n{3,}/g, '\n\n');

  // Step 3: Replace modal JSX patterns
  // Strategy: Use regex to find modal blocks and replace them

  // Pattern: Find <Modal onClick={...}> or <ModalOverlay onClick={...}> blocks
  // Handle both single-line and multi-line onClick

  function findMatchingClose(text, startIdx, openTag, closeTag) {
    // openTag is like "<Modal" - we need to match it followed by space or >
    // to avoid matching <ModalContent, <ModalBody etc.
    let depth = 1;
    let i = startIdx;
    while (i < text.length && depth > 0) {
      const nextClose = text.indexOf(closeTag, i);
      if (nextClose === -1) return -1;

      // Search for any nested open tags between i and nextClose
      let searchPos = i;
      let foundNested = false;
      while (searchPos < nextClose) {
        const nextOpen = text.indexOf(openTag, searchPos);
        if (nextOpen === -1 || nextOpen >= nextClose) break;
        // Check that the char after openTag is space or > (not a letter like ModalContent)
        const charAfter = text[nextOpen + openTag.length];
        if (charAfter === ' ' || charAfter === '>' || charAfter === '\n') {
          depth++;
          searchPos = nextOpen + openTag.length;
          foundNested = true;
        } else {
          searchPos = nextOpen + openTag.length;
        }
      }

      depth--;
      if (depth === 0) return nextClose;
      i = nextClose + closeTag.length;
    }
    return -1;
  }

  // Process modals iteratively
  let changeCount = 0;
  let safety = 0;

  while (safety < 50) {
    safety++;

    // Find next modal pattern:
    // Pattern A: <Modal onClick={...}> or <ModalOverlay onClick={...}>
    // Pattern B: <ModalOverlay show={...} onClick={...}> (show attribute before onClick)
    // Pattern C: <Modal show={...}> (no onClick, just show prop)
    const modalMatch = content.match(/<(Modal|ModalOverlay)\s+(?:show=\{[^}]+\}\s+)?onClick=\{/)
      || content.match(/<(Modal)\s+show=\{/);
    if (!modalMatch) break;

    const modalTagName = modalMatch[1];
    const modalStartIdx = content.indexOf(modalMatch[0]);

    // Find the end of the opening tag (handle multi-line attributes)
    let tagEnd = modalStartIdx;
    let braceDepth = 0;
    for (let i = modalStartIdx; i < content.length; i++) {
      const ch = content[i];
      if (ch === '{') braceDepth++;
      if (ch === '}') braceDepth--;
      if (ch === '>' && braceDepth === 0) {
        tagEnd = i + 1;
        break;
      }
    }

    // Extract the opening tag text
    const modalOpenTag = content.substring(modalStartIdx, tagEnd);

    // Extract the onClick handler or close function from show prop
    const onClickMatch = modalOpenTag.match(/onClick=\{([\s\S]+?)\}\s*>/);
    let closeFn;
    if (onClickMatch) {
      closeFn = onClickMatch[1].trim().replace(/\s+/g, ' ').trim();
    } else {
      // Pattern C: <Modal show={showXxx}> - derive close from show prop name
      const showMatch = modalOpenTag.match(/show=\{(\w+)\}/);
      if (!showMatch) {
        content = content.substring(0, modalStartIdx) + '<Modal_SKIP' + content.substring(modalStartIdx + 6);
        continue;
      }
      // e.g., showAddModal -> setShowAddModal(false)
      const showVar = showMatch[1];
      closeFn = '() => set' + showVar.charAt(0).toUpperCase() + showVar.slice(1) + '(false)';
    }

    // Find the closing </Modal> or </ModalOverlay>
    const closeTag = `</${modalTagName}>`;
    const modalEndIdx = findMatchingClose(content, tagEnd, `<${modalTagName}`, closeTag);
    if (modalEndIdx === -1) {
      content = content.substring(0, modalStartIdx) + '<Modal_SKIP' + content.substring(modalStartIdx + 6);
      continue;
    }
    const modalEndFull = modalEndIdx + closeTag.length;

    // Extract the inner content between <Modal...> and </Modal>
    let inner = content.substring(tagEnd, modalEndIdx).trim();

    // If outer is ModalOverlay, unwrap nested <Modal onClick={e.stopPropagation()}>...</Modal>
    if (modalTagName === 'ModalOverlay') {
      const nestedModalMatch = inner.match(/^<Modal\s+[^>]*onClick=\{[^}]*stopPropagation[^}]*\}[^>]*>([\s\S]*)<\/Modal>$/);
      if (nestedModalMatch) {
        inner = nestedModalMatch[1].trim();
      }
      // Also handle <Modal onClick={...} style={...}>
      const nestedModalMatch2 = inner.match(/^<Modal\s+[^>]*>([\s\S]*)<\/Modal>$/);
      if (!nestedModalMatch && nestedModalMatch2) {
        // Check for maxWidth in the Modal tag
        const nestedTag = inner.match(/^<Modal\s+([^>]*)>/);
        if (nestedTag) {
          const mwMatch = nestedTag[1].match(/maxWidth:\s*'(\d+px)'/);
          if (mwMatch) inner = '__MW__' + mwMatch[1] + '__' + nestedModalMatch2[1].trim();
          else inner = nestedModalMatch2[1].trim();
        }
      }
    }

    // Parse inner: expect ModalContent > ModalHeader > ModalTitle + CloseButton > /ModalHeader > ModalBody > ... > /ModalBody > [ModalFooter > ... > /ModalFooter] > /ModalContent
    // Or with form wrapper: ModalContent > form > ModalHeader > ...

    // Extract title from ModalTitle
    const titleMatch = inner.match(/<ModalTitle>(.+?)<\/ModalTitle>/s);
    if (!titleMatch) {
      content = content.substring(0, modalStartIdx) + '<Modal_SKIP' + content.substring(modalStartIdx + 6);
      continue;
    }
    let title = titleMatch[1].trim();

    // Determine size from ModalContent maxWidth or nested Modal style
    let sizeAttr = '';
    const mwStyleMatch = inner.match(/<ModalContent[^>]*style=\{\{[^}]*maxWidth:\s*'(\d+px)'/)
      || inner.match(/<Modal[^>]*style=\{\{[^}]*maxWidth:\s*'(\d+px)'/);
    const mwPropMatch = inner.match(/<ModalContent[^>]*maxWidth="([^"]+)"/);
    let maxWidth = '';
    // Check __MW__ marker from nested Modal unwrap
    const mwMarker = inner.match(/^__MW__(\d+px)__/);
    if (mwMarker) { maxWidth = mwMarker[1]; inner = inner.replace(/^__MW__\d+px__/, ''); }
    if (mwStyleMatch) maxWidth = mwStyleMatch[1];
    if (mwPropMatch) maxWidth = mwPropMatch[1];
    if (maxWidth === '800px' || maxWidth === '900px') sizeAttr = ' size="large"';
    else if (maxWidth && maxWidth !== '600px' && maxWidth !== '720px') sizeAttr = ` maxWidth="${maxWidth}"`;
    else if (maxWidth === '720px') sizeAttr = ' maxWidth="720px"';

    // Find ModalBody content (or content between header and footer/actions/end)
    let bodyContent;
    let bodyEndIdx;
    const hasModalBody = inner.includes('<ModalBody>') && inner.includes('</ModalBody>');
    if (hasModalBody) {
      const bodyStartIdx = inner.indexOf('<ModalBody>') + '<ModalBody>'.length;
      bodyEndIdx = inner.lastIndexOf('</ModalBody>');
      bodyContent = inner.substring(bodyStartIdx, bodyEndIdx);
    } else {
      // No ModalBody wrapper - content is between </ModalHeader> and <ModalActions>|<ModalFooter>|</ModalContent>|end
      const headerEndIdx = inner.indexOf('</ModalHeader>');
      if (headerEndIdx === -1) {
        content = content.substring(0, modalStartIdx) + '<Modal_SKIP' + content.substring(modalStartIdx + 6);
        continue;
      }
      const bodyStart = headerEndIdx + '</ModalHeader>'.length;
      // Find end of body: ModalActions, ModalFooter, or </ModalContent>
      let bodyEnd = inner.length;
      const actionsIdx = inner.indexOf('<ModalActions', bodyStart);
      const footerIdx = inner.indexOf('<ModalFooter', bodyStart);
      const contentEndIdx = inner.indexOf('</ModalContent>', bodyStart);
      if (actionsIdx !== -1 && actionsIdx < bodyEnd) bodyEnd = actionsIdx;
      if (footerIdx !== -1 && footerIdx < bodyEnd) bodyEnd = footerIdx;
      if (contentEndIdx !== -1 && contentEndIdx < bodyEnd) bodyEnd = contentEndIdx;
      bodyContent = inner.substring(bodyStart, bodyEnd);
      bodyEndIdx = bodyEnd;
    }

    // Find ModalFooter or ModalActions content (may not exist)
    let footerContent = '';
    let footerStartIdx = inner.indexOf('<ModalFooter', bodyEndIdx);
    let footerCloseTag = '</ModalFooter>';
    if (footerStartIdx === -1) {
      footerStartIdx = inner.indexOf('<ModalActions', bodyEndIdx);
      footerCloseTag = '</ModalActions>';
    }
    if (footerStartIdx !== -1) {
      let footerTagEnd = inner.indexOf('>', footerStartIdx) + 1;
      const footerEndIdx = inner.indexOf(footerCloseTag, footerTagEnd);
      if (footerEndIdx !== -1) {
        footerContent = inner.substring(footerTagEnd, footerEndIdx).trim();
      }
    }

    // Build footer prop
    let footerAttr = '';
    if (footerContent) {
      // Normalize whitespace but preserve attribute spacing
      footerContent = footerContent.replace(/\n\s*/g, ' ').replace(/\s{2,}/g, ' ').trim();
      // Remove > < whitespace that's just formatting
      footerContent = footerContent.replace(/>\s+</g, '><');
      // But restore spaces between JSX attributes: >word< is fine, but <Buttonvariant is not
      // The issue: trimming lines and joining without space between closing tag text and opening tag
      // Actually the issue was only when trimming removed newlines between attributes of same element
      // Let's be more careful: preserve space before attribute-like patterns
      footerContent = footerContent.replace(/<Button([a-z])/g, '<Button $1');
      footerContent = footerContent.replace(/<ThemedButton([a-z])/g, '<ThemedButton $1');

      // Count top-level elements for fragment wrapping
      const topElements = footerContent.match(/<(Button|ThemedButton|DeleteButton|DeleteNoticeButton)\s/g);
      const hasConditional = footerContent.includes('{(') || footerContent.includes('{String') || footerContent.includes('&&');
      if ((topElements && topElements.length > 1) || hasConditional) {
        footerContent = `<>${footerContent}</>`;
      }
      footerAttr = ` footer={${footerContent}}`;
    }

    // Build title prop
    let titleProp;
    if (title.includes('{') || title.includes('<')) {
      // JSX expression in title - wrap with curly braces if not already
      if (title.startsWith('{') && title.endsWith('}')) {
        titleProp = `title=${title}`;
      } else {
        // Contains mixed content - use string with backticks won't work in JSX
        // Just use as string, the JSX parts will need manual fix
        titleProp = `title="${title.replace(/"/g, "'")}"`;
      }
    } else {
      titleProp = `title="${title}"`;
    }

    // Get indentation
    const beforeModal = content.substring(0, modalStartIdx);
    const lastNewline = beforeModal.lastIndexOf('\n');
    const indent = beforeModal.substring(lastNewline + 1);

    // Check if we need to add conditional rendering
    // If the original modal used show={showVar} prop (CSS visibility), we need {showVar && (...)}
    const showPropMatch = modalOpenTag.match(/show=\{(\w+)\}/);
    let needsConditional = false;
    let showVar = '';
    if (showPropMatch) {
      showVar = showPropMatch[1];
      // Check if there's already a conditional wrapper before this modal
      const beforeText = content.substring(Math.max(0, modalStartIdx - 100), modalStartIdx);
      if (!beforeText.includes(showVar + ' && (') && !beforeText.includes(showVar + ' &&\n')) {
        needsConditional = true;
      }
    }

    // Build replacement
    const openingLine = `${indent}<CommonModal isOpen={true} onClose={${closeFn}} ${titleProp}${sizeAttr}${footerAttr}>`;
    const closingLine = `${indent}</CommonModal>`;

    let replacement;
    if (needsConditional) {
      replacement = `${indent}{${showVar} && (\n${openingLine}\n${bodyContent}\n${closingLine}\n${indent})}`;
    } else {
      replacement = `${openingLine}\n${bodyContent}\n${closingLine}`;
    }
    content = content.substring(0, modalStartIdx) + replacement + content.substring(modalEndFull);

    changeCount++;
  }

  // Restore any _SKIP markers
  content = content.replace(/<Modal_SKIP/g, '<Modal');

  // Clean up multiple blank lines
  content = content.replace(/\n{3,}/g, '\n\n');

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✓ ${filePath}: ${changeCount} modal(s) migrated`);
  } else {
    console.log(`- ${filePath}: no changes`);
  }
}
