'use client'

import 'katex/dist/katex.min.css'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { Citing } from './custom-link'
import { CodeBlock } from './ui/codeblock'
import { MemoizedReactMarkdown } from './ui/markdown'

export function BotMessage({ message }: { message: string }) {
  // Check if the content contains LaTeX patterns
  const containsLaTeX = /\\([\s\S]*?)\\|\\([\s\S]*?)\\/.test(
    message || ''
  )

  // Modify the content to render LaTeX equations if LaTeX patterns are found
  const processedData = preprocessLaTeX(message || '')

  if (containsLaTeX) {
    return (
      <MemoizedReactMarkdown
        rehypePlugins={[
          [rehypeExternalLinks, { target: '_blank' }],
          [rehypeKatex]
        ]}
        remarkPlugins={[remarkGfm, remarkMath]}
        className="prose-sm prose-neutral prose-a:text-accent-foreground/50"
      >
        {processedData}
      </MemoizedReactMarkdown>
    )
  }

  return (
    <MemoizedReactMarkdown
      rehypePlugins={[[rehypeExternalLinks, { target: '_blank' }]]}
      remarkPlugins={[remarkGfm]}
      className="prose-sm prose-neutral prose-a:text-accent-foreground/50"
      components={{
        code({ node, inline = false, className, children, ...props }) {
          if (!children || typeof children !== 'string' && !Array.isArray(children)) {
            return null
          }

          // Ensure children is an array and process the first element safely
          const childrenArray = Array.isArray(children) ? children : [children]

          if (typeof childrenArray[0] === 'string' && childrenArray[0].includes('▍')) {
            return (
              <span className="mt-1 cursor-default animate-pulse">▍</span>
            )
          }

          const match = /language-(\w+)/.exec(className || '')

          if (inline) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }

          return (
            <CodeBlock
              key={Math.random()}
              language={(match && match[1]) || ''}
              value={String(childrenArray).replace(/\n$/, '')}
              {...props}
            />
          )
        },
        a: Citing
      }}
    >
      {message}
    </MemoizedReactMarkdown>
  )
}

// Preprocess LaTeX equations to be rendered by KaTeX
const preprocessLaTeX = (content: string) => {
  const blockProcessedContent = content.replace(
    /\\([\s\S]*?)\\/g,
    (_, equation) => `$$${equation}$$`
  )
  const inlineProcessedContent = blockProcessedContent.replace(
    /\\([\s\S]*?)\\/g,
    (_, equation) => `$${equation}$`
  )
  return inlineProcessedContent
        }
