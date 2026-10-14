const image = name => `${import.meta.env.BASE_URL}images/anime/${name}.webp`
const character = (name, file) => ({ name, image: image(file) })
// Add chosen clips to moments: [{ title: '...', youtubeId: '11-character ID' }].
// They stay behind a spoiler reveal until the visitor chooses to watch.
export const ANIME_DETAILS = [
  { id: 'naruto', title: 'Naruto', subtitle: 'Bonds / ambition / perseverance', tone: '#ee8ba7',
    description: 'A restless young ninja dreams of becoming Hokage and finally earning his village’s respect. Training and missions with Team 7 open up a world of rivalries, difficult choices and friendships that become the heart of the story.',
    jaDescription: '里に認められ、火影になることを夢見る少年ナルト。第七班での修業や任務を通して、ライバル、難しい選択、かけがえのない絆に出会っていく。',
    characters: [character('Naruto Uzumaki', 'naruto'), character('Sakura Haruno', 'sakura'), character('Sasuke Uchiha', 'sasuke')], source: 'https://www.tv-tokyo.co.jp/anime/naruto/sp/chara/chara_detail.html', moments: [] },
  { id: 'fullmetal', title: 'Fullmetal Alchemist: Brotherhood', subtitle: 'Family / alchemy / consequence', tone: '#bd9bed',
    description: 'After a forbidden alchemical experiment changes their lives, Edward and Alphonse Elric search for a way to restore their bodies. Their journey brings together a richly imagined world, a growing mystery and a fiercely loyal bond between brothers.',
    jaDescription: '禁じられた錬金術で人生が変わったエドワードとアルフォンス。体を取り戻す旅の中で、二人は広大な世界と謎に向き合う。兄弟の絆が中心にある物語。',
    characters: [character('Edward Elric', 'edward'), character('Alphonse Elric', 'alphonse')], source: 'https://fullmetalalchemistusa.com/character/', moments: [] },
  { id: 'mha', title: 'My Hero Academia', subtitle: 'Courage / growth / heroism', tone: '#f5ba75',
    description: 'In a world where superpowers are common, Izuku Midoriya dreams of being a hero despite being born without one. The story follows his path towards hero training, alongside classmates with very different abilities and ideas about what makes a hero.',
    jaDescription: '超常能力が当たり前の世界で、無個性の緑谷出久はヒーローを夢見る。多彩な能力と価値観を持つ仲間とともに、ヒーローへの道を歩んでいく。',
    characters: [character('Izuku Midoriya', 'deku'), character('Katsuki Bakugo', 'bakugo')], source: 'https://www.ytv.co.jp/heroaca/character/', moments: [] },
  { id: 'dbz', title: 'Dragon Ball Z', subtitle: 'Rivals / resolve / limitless battles', tone: '#83c6cc',
    description: 'Goku and his friends defend Earth as threats arrive from far beyond their familiar world. Martial arts grow into enormous battles, with Gohan joining the action and each challenge pushing the fighters to discover what they are capable of.',
    jaDescription: '遠い世界から迫る脅威に、悟空と仲間たちが立ち向かう。悟飯も加わり、より大きな戦いの中で戦士たちは自分の限界に挑んでいく。',
    characters: [character('Dragon Ball Z — ensemble artwork', 'dbz')], source: 'https://www.toei-animation-usa.com/dragon-ball.html', moments: [] },
  { id: 'demon-slayer', title: 'Demon Slayer', subtitle: 'Compassion / swordsmanship / family', tone: '#ee8ba7',
    description: 'Tanjiro Kamado joins the Demon Slayer Corps in the hope of helping his sister Nezuko become human again. Their journey combines striking sword fights with a compassionate hero and a world shaped by the conflict between humans and demons.',
    jaDescription: '妹の禰豆子を人間に戻すため、竈門炭治郎は鬼殺隊へ。人と鬼が対立する世界を、思いやりを忘れない少年が進む。美しい剣戟も魅力の物語。',
    characters: [character('Tanjiro Kamado', 'tanjiro'), character('Nezuko Kamado', 'nezuko'), character('Zenitsu Agatsuma', 'zenitsu')], source: 'https://demonslayer-anime.com/mugentrainarc/character/', moments: [] },
  { id: 'jjk', title: 'Jujutsu Kaisen', subtitle: 'Curses / conviction / supernatural action', tone: '#bd9bed',
    description: 'An encounter with a cursed object pulls Yuji Itadori into the hidden world of jujutsu sorcerers. Alongside his classmates and teacher, he learns to face dangerous curses and the difficult responsibilities that come with protecting other people.',
    jaDescription: '呪物との出会いから、虎杖悠仁は呪術師の世界へ。仲間や先生とともに危険な呪いと対峙し、人を守る責任に向き合っていく。',
    characters: [character('Yuji Itadori', 'yuji'), character('Megumi Fushiguro', 'megumi'), character('Satoru Gojo', 'gojo')], source: 'https://en.bandainamcoent.eu/jujutsu-kaisen/news/yuji-itadori-ryomen-sukuna-megumi-fushiguro-nobara-kugisaki-and-satoru-gojo', moments: [] },
]
