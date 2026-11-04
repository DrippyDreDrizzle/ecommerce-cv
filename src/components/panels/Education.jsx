import Panel from '../Panel'
import { useLanguage } from '../../context/LanguageContext'
import './Education.css'

export default function Education({ onNavigate }) {
  const { t, lang } = useLanguage()
  const ja = lang === 'ja'
  return <Panel className="education-page" title={t.tabs.education}>
    <h3 className="edu-heading">{ja ? '見習いからシニアECマネージャーへ' : 'From apprentice to Senior Ecommerce Manager'}</h3>
    <ol className="edu-path">
      {t.content.education.map((entry, i) => <li key={entry.title}>
        <div className="edu-date"><span aria-hidden="true">0{i + 1}</span>{entry.year}</div>
        <h4>{entry.title}</h4><strong>{entry.org}</strong><p>{entry.detail}</p>
      </li>)}
    </ol>
    <div className="edu-footer"><p><strong>{ja ? 'その他の研修' : 'Other training'}</strong>{ja ? 'FAコーチング、サッカーの応急処置、セーフガーディングの各講習。' : 'FA coaching, football first aid and safeguarding courses.'}</p>
    <button type="button" onClick={e => onNavigate('record', e)}>{ja ? '仕事の実績を見る' : 'Explore my track record'} →</button></div>
  </Panel>
}
