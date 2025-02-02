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
        code({ node, className, children, ...props }) {
          if (!children || (typeof children !== 'string' && !Array.isArray(children))) {
            return null
          }

          // Handle "▍" special case
          if (children.length && children[0] === '▍') {
            return <span className="mt-1 cursor-default animate-pulse">▍</span>
          }

          const match = /language-(\w+)/.exec(className || '')

          // If no language class is found, treat it as inline code
          if (!match) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }

          return (
            <CodeBlock
              key={Math.random()}
              language={match[1] || ''}
              value={String(children).replace(/\n$/, '')}
              {...props}
            />
          )
        },
  a: Citing as unknown as React.ComponentType<React.AnchorHTMLAttributes<HTMLAnchorElement>
      }}
    >
      {message}
    </MemoizedReactMarkdown>
  )
}

// Preprocess LaTeX equations to be rendered by KaTeX
// ref: https://github.com/remarkjs/react-markdown/issues/785
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
