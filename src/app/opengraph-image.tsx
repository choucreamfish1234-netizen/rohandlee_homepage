import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = '법률사무소 로앤이 | 오직 피해자만 변호합니다'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1B3B2F 0%, #2d5a47 50%, #1B3B2F 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #C9A96E, #E8D5A8, #C9A96E)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* Logo text */}
          <div
            style={{
              fontSize: '28px',
              color: '#C9A96E',
              letterSpacing: '8px',
              fontWeight: 600,
            }}
          >
            ROH &amp; LEE LAW FIRM
          </div>

          {/* Korean title */}
          <div
            style={{
              fontSize: '64px',
              color: '#FFFFFF',
              fontWeight: 800,
              letterSpacing: '4px',
            }}
          >
            법률사무소 로앤이
          </div>

          {/* Divider */}
          <div
            style={{
              width: '80px',
              height: '3px',
              background: '#C9A96E',
              margin: '8px 0',
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: '32px',
              color: '#E8D5A8',
              fontWeight: 500,
              letterSpacing: '6px',
            }}
          >
            오직 피해자만 변호합니다
          </div>

          {/* Contact info */}
          <div
            style={{
              fontSize: '22px',
              color: 'rgba(255,255,255,0.7)',
              marginTop: '20px',
              letterSpacing: '2px',
            }}
          >
            무료 상담 032-207-8788
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #C9A96E, #E8D5A8, #C9A96E)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
