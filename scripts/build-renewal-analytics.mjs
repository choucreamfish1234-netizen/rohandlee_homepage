import { build } from 'esbuild'
import nextEnv from '@next/env'
nextEnv.loadEnvConfig(process.cwd())
await build({
 entryPoints:['src/renewal/analytics.tsx'],outfile:'public/renewal/analytics.js',bundle:true,minify:true,platform:'browser',format:'iife',jsx:'automatic',
 define:{'process.env.NODE_ENV':'"production"','process.env.NEXT_PUBLIC_SUPABASE_URL':JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_URL||''),'process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY':JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||''),'process.env.NEXT_PUBLIC_GA_ID':JSON.stringify(process.env.NEXT_PUBLIC_GA_ID||'')},
 plugins:[{name:'standalone-pathname',setup(b){b.onResolve({filter:/^next\/navigation$/},()=>({path:'pathname',namespace:'renewal'}));b.onLoad({filter:/.*/,namespace:'renewal'},()=>({contents:'export function usePathname(){return window.location.pathname}',loader:'js'}))}}]
})
