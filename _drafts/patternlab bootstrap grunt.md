# Comment j'utilise Gruntjs, patternlab-php et bootstrap

Dans le cadre d'une refonte graphique de site TYPO3, nous avons utilisé la méthodologie "Atomic design" prêchée par Brad Frost. Nous avons donc utilisé [patternlab](http://www.pattern-lab.info/) afin de repenser la charte.  
Le choix a été fait de s'appuyer le framework [Bootstrap](http://getbootstrap.com/) pour le CSS.

Il fallait trouver un moyen d'automatiser tout le processus pour compiler les CSS et JavaScript, générer le site patternlab et créer les fichiers utils à TYPO3 et templavoilà.  
Pour ce faire, nous avons utilisé [Grunt](http://gruntjs.com/). C'est la première fois que je m'y frottais et j'ai été conquis.