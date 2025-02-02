import { FC, memo } from 'react'
import ReactMarkdown from 'react-markdown'

export const MemoizedReactMarkdown: FC<ReactMarkdown['props']> = memo(
  (props) => <ReactMarkdown {...props} />
)
{/*import { FC, memo } from 'react'
import ReactMarkdown, { Options } from 'react-markdown'

export const MemoizedReactMarkdown: FC<Options> = memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
)
*/}
