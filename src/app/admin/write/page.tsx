'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  type BlogPost,
  CATEGORIES,
  getPostById,
  createPost,
  updatePost,
  getCategoryThumbnail,
} from '@/lib/blog'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100)
}

type EditorTab = 'homepage' | 'naver'

export default function AdminWritePageWrapper() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400 text-sm">로딩 중...</div>}>
      <AdminWritePage />
    </Suspense>
  )
}

function AdminWritePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [naverContent, setNaverContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [category, setCategory] = useState('일반')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [aiTopic, setAiTopic] = useState('')
  const [showAiPanel, setShowAiPanel] = useState(false)
  const [editorTab, setEditorTab] = useState<EditorTab>('homepage')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_authenticated') !== 'true') {
      router.push('/admin')
      return
    }
    if (editId) {
      loadPost(Number(editId))
    }
  }, [editId, router])

  async function loadPost(id: number) {
    const { post } = await getPostById(id)
    if (post) {
      setTitle(post.title)
      setSlug(post.slug)
      setContent(post.content)
      setNaverContent(post.naver_content || '')
      setExcerpt(post.excerpt || '')
      setMetaDescription(post.meta_description || '')
      setCategory(post.category)
      setTags(post.tags || [])
      setThumbnailUrl(post.thumbnail_url || '')
    }
  }

  // Auto-generate slug from title
  useEffect(() => {
    if (!editId && title) {
      setSlug(generateSlug(title))
    }
  }, [title, editId])

  const addTag = () => {
    const tag = tagInput.trim()
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
    }
    setTagInput('')
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }
  }

  // Markdown toolbar actions
  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = content.substring(start, end)
    const replacement = before + (selected || '텍스트') + after
    const newContent = content.substring(0, start) + replacement + content.substring(end)
    setContent(newContent)
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + before.length
      textarea.selectionEnd = start + before.length + (selected || '텍스트').length
    }, 0)
  }

  const handleSave = async (saveStatus: 'draft' | 'published') => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.')
      return
    }

    setSaving(true)
    const postData: Partial<BlogPost> = {
      title: title.trim(),
      slug: slug.trim() || generateSlug(title),
      content: content.trim(),
      naver_content: naverContent.trim() || null,
      excerpt: excerpt.trim() || content.trim().substring(0, 200),
      meta_description: metaDescription.trim() || excerpt.trim() || title.trim(),
      category,
      tags,
      thumbnail_url: thumbnailUrl.trim() || getCategoryThumbnail(category),
      status: saveStatus,
      published_at: saveStatus === 'published' ? new Date().toISOString() : null,
    }

    try {
      if (editId) {
        const { error } = await updatePost(Number(editId), postData)
        if (error) throw error
      } else {
        const { error } = await createPost(postData)
        if (error) throw error
      }
      router.push('/admin/dashboard')
    } catch {
      alert('저장에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setSaving(false)
    }
  }

  const handleAiGenerate = async () => {
    if (!aiTopic.trim()) {
      alert('주제를 입력해주세요.')
      return
    }
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic.trim(),
          category,
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)

      if (data.title) setTitle(data.title)
      if (data.slug) setSlug(data.slug)
      if (data.content) setContent(data.content)
      if (data.naverContent) setNaverContent(data.naverContent)
      if (data.excerpt) setExcerpt(data.excerpt)
      if (data.tags) setTags(data.tags)
      if (data.meta_description) setMetaDescription(data.meta_description)
      setShowAiPanel(false)
      setAiTopic('')
    } catch {
      alert('AI 생성에 실패했습니다. API 키를 확인해주세요.')
    } finally {
      setGenerating(false)
    }
  }

  const copyNaverContent = async () => {
    try {
      await navigator.clipboard.writeText(naverContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const textarea = document.createElement('textarea')
      textarea.value = naverContent
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const toolbarButtons = [
    { label: 'B', action: () => insertMarkdown('**', '**'), title: '굵게' },
    { label: 'I', action: () => insertMarkdown('*', '*'), title: '기울임' },
    { label: 'H2', action: () => insertMarkdown('\n## ', '\n'), title: '제목 2' },
    { label: 'H3', action: () => insertMarkdown('\n### ', '\n'), title: '제목 3' },
    { label: '""', action: () => insertMarkdown('\n> ', '\n'), title: '인용' },
    { label: '-', action: () => insertMarkdown('\n- ', '\n'), title: '목록' },
    { label: '1.', action: () => insertMarkdown('\n1. ', '\n'), title: '번호 목록' },
    { label: '---', action: () => insertMarkdown('\n---\n', ''), title: '구분선' },
    { label: 'Link', action: () => insertMarkdown('[', '](url)'), title: '링크' },
    { label: 'Img', action: () => insertMarkdown('![설명](', ')'), title: '이미지' },
    { label: '`', action: () => insertMarkdown('`', '`'), title: '인라인 코드' },
  ]

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black">
            {editId ? '글 수정' : '새 글 작성'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">마크다운으로 글을 작성하세요.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowAiPanel(!showAiPanel)}
            className="px-4 py-2.5 border border-purple-200 text-purple-600 text-sm font-medium hover:bg-purple-50 transition-colors"
          >
            AI 생성
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2.5 border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {showPreview ? '에디터' : '미리보기'}
          </button>
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-4 py-2.5 border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            임시저장
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="px-4 py-2.5 bg-[#1B3B2F] text-white text-sm font-medium hover:bg-[#1B3B2F]/90 disabled:opacity-50 transition-colors"
          >
            {saving ? '저장 중...' : '게시하기'}
          </button>
        </div>
      </div>

      {/* AI Generation Panel */}
      {showAiPanel && (
        <div className="mb-6 p-6 border border-purple-200 bg-purple-50/50">
          <h3 className="text-sm font-semibold text-purple-800 mb-3">AI 블로그 생성</h3>
          <p className="text-xs text-purple-600 mb-4">
            주제를 입력하면 AI가 홈페이지용(마크다운) + 네이버용(HTML) 두 가지 버전을 동시에 생성합니다.
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              placeholder="예: 보이스피싱 피해 시 대처 방법"
              className="flex-1 px-4 py-2.5 border border-purple-200 text-sm focus:outline-none focus:border-purple-400 bg-white"
              onKeyDown={(e) => e.key === 'Enter' && handleAiGenerate()}
            />
            <button
              onClick={handleAiGenerate}
              disabled={generating}
              className="px-6 py-2.5 bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50 transition-colors whitespace-nowrap"
            >
              {generating ? '생성 중...' : '생성하기'}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-3 space-y-4">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full px-4 py-3 border border-gray-200 text-lg font-bold focus:outline-none focus:border-[#1B3B2F] transition-colors"
          />

          {/* Slug */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 whitespace-nowrap">/blog/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="url-slug"
              className="flex-1 px-3 py-2 border border-gray-200 text-xs text-gray-600 focus:outline-none focus:border-[#1B3B2F] transition-colors"
            />
          </div>

          {/* Excerpt */}
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="요약글 (목록에 표시될 짧은 설명)"
            rows={2}
            className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F] transition-colors resize-none"
          />

          {/* Editor Tabs: 홈페이지용 / 네이버용 */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setEditorTab('homepage')}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                editorTab === 'homepage'
                  ? 'border-[#1B3B2F] text-[#1B3B2F]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              홈페이지용 (마크다운)
            </button>
            <button
              onClick={() => setEditorTab('naver')}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                editorTab === 'naver'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              네이버용 (HTML)
              {naverContent && <span className="ml-1.5 w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />}
            </button>
          </div>

          {/* Homepage Editor */}
          {editorTab === 'homepage' && (
            <>
              {showPreview ? (
                <div className="border border-gray-200 p-6 min-h-[500px]">
                  <div className="prose prose-sm max-w-none
                    prose-headings:text-black prose-headings:font-bold
                    prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
                    prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
                    prose-p:text-gray-700 prose-p:leading-relaxed
                    prose-a:text-[#1B3B2F] prose-a:font-medium
                    prose-strong:text-black
                    prose-blockquote:border-[#1B3B2F] prose-blockquote:text-gray-600
                  ">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {content || '*미리보기할 내용이 없습니다.*'}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Toolbar */}
                  <div className="flex flex-wrap items-center gap-1 border border-gray-200 border-b-0 bg-gray-50 px-2 py-1.5">
                    {toolbarButtons.map((btn) => (
                      <button
                        key={btn.title}
                        onClick={btn.action}
                        title={btn.title}
                        className="px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-white hover:text-black rounded transition-colors"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                  <textarea
                    id="content-editor"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="마크다운으로 내용을 작성하세요..."
                    className="w-full px-4 py-4 border border-gray-200 text-sm font-mono leading-relaxed focus:outline-none focus:border-[#1B3B2F] transition-colors resize-y min-h-[500px]"
                  />
                </div>
              )}
            </>
          )}

          {/* Naver Editor */}
          {editorTab === 'naver' && (
            <div className="space-y-4">
              {/* Copy Button */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  네이버 블로그 에디터의 HTML 모드에 붙여넣기하세요.
                </p>
                <button
                  onClick={copyNaverContent}
                  disabled={!naverContent}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-green-600 text-white hover:bg-green-700 disabled:opacity-50'
                  }`}
                >
                  {copied ? '복사 완료!' : '네이버용 복사'}
                </button>
              </div>

              {/* Naver Preview / Editor toggle */}
              {showPreview ? (
                <div className="border border-gray-200 p-6 min-h-[500px] bg-white">
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: naverContent || '<p style="color:#999">네이버용 콘텐츠가 없습니다. AI 생성을 사용하세요.</p>' }}
                  />
                </div>
              ) : (
                <textarea
                  value={naverContent}
                  onChange={(e) => setNaverContent(e.target.value)}
                  placeholder="네이버 블로그용 HTML 콘텐츠... (AI 생성 시 자동 채워집니다)"
                  className="w-full px-4 py-4 border border-gray-200 text-sm font-mono leading-relaxed focus:outline-none focus:border-green-500 transition-colors resize-y min-h-[500px]"
                />
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F] transition-colors bg-white"
            >
              {CATEGORIES.filter((c) => c !== '전체').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">태그</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1"
                >
                  #{tag}
                  <button onClick={() => removeTag(tag)} className="text-gray-400 hover:text-red-500">
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="태그 입력 후 Enter"
              className="w-full px-3 py-2 border border-gray-200 text-xs focus:outline-none focus:border-[#1B3B2F] transition-colors"
            />
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">썸네일 URL</label>
            <input
              type="text"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="이미지 URL (비우면 카테고리 기본 이미지)"
              className="w-full px-3 py-2 border border-gray-200 text-xs focus:outline-none focus:border-[#1B3B2F] transition-colors"
            />
            {(thumbnailUrl || category) && (
              <div className="mt-2 aspect-[16/10] bg-gray-100 overflow-hidden">
                <img
                  src={thumbnailUrl || getCategoryThumbnail(category)}
                  alt="썸네일 미리보기"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">SEO 설명</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="검색 엔진에 표시될 설명"
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 text-xs focus:outline-none focus:border-[#1B3B2F] transition-colors resize-none"
            />
          </div>

          {/* Back to Dashboard */}
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="text-xs text-gray-500 hover:text-black transition-colors"
            >
              &larr; 대시보드로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
