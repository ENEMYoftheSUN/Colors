Simple gestion des couleurs en JS (ES6).  
Pas de dépendances, et peut être facilement adapté pour fonctionner sous forme de module.  
Les types utilisés (_interfaces_) sont décrits, rendant facile l'éventuel portage vers du TypeScript.

# Bases

Instanciation à partir des valeurs RGBA. Par défaut chaque valeur si non précisé vaut 0, sauf le canal alpha qui est à 255.  
`new Colors ([R = 0], [G = 0], [B = 0], [A = 255]);`  

Exemples :  
```const color = new Colors ();```  
```const color = new Colors (34, 88, 200);```  
```const color = new Colors (34, 88, 200, 145);```

On peut alors obtenir et/ou convertir la couleur dans différents formats : en RGBA, en héxadécimal, en HSLA ou en version normalisée (vecteur).  

##### RGBA  
Valeurs entières comprises entre 0 et 255.
* `getRGBA ()` : retourne un objet de type `{ R: 34, G: 88, B: 200, A: 145 }`
* `getRGBAasArray ()` : retourne un array `[ 34, 88, 200, 145 ]`
 
Exemple :  
```const color = new Colors (34, 88, 200, 145);```  
```color.getRGBA ();```  

  
##### Normalized
Valeurs flottantes comprises entre 0 et 1 :
* `getNormalized ()` : retourne un objet de type `{ R: 0.13333333333333333, G: 0.34509803921568627, B: 0.7843137254901961, A: 0.5686274509803921 }`
* `getNormalizedAsArray ()`


##### Hexadecimal
Texte en majuscule sur 2 caractères, compris entre "00" et "FF" :  
* `getHexa ()` : retourne un objet de type `{ R: "22", G: "58", B: "C8", A: "91" }`
* `getHexaAsArray ()`


##### HSLA
Valeurs flottantes comprises entre 0 et 1, sauf pour H qui est en degré et est compris entre 0 et 360.  
* `getHSLA ()` : retourne un objet de type `{ H: 220.48192771084337, S: 0.7094017094017094, L: 0.4588235294117647, A: 0.5686274509803921 }`
* `getHSLAasArray ()`


# Instanciations avancées
On peut instancier la classe à partir d'autres format que le RGBA.  

* `Colors.fromNormalized ([R = 0.0], [G = 0.0], [B = 0.0], [A = 1.0]);`
* `Colors.fromHSLA ([H = 0.0], [S = 0.0], [L = 0.0], [A = 1.0]);`
* `Colors.fromHexa ([R = "00"|"0"], [R = "00"|"0"], [B = "00"|"0"], [A = "FF"|"F"]);` : on peut utiliser un caractère au lieu de deux. Par exemple, "C" est vu comme "CC", mais "0C" est bien vu comme "0C".
* `Colors.fromString ("[#]RRGGBB");` : le préfixe "#" n'est pas obligatoire
* `Colors.fromString ("[#]RGB");`
* `Colors.fromString ("[#]RRGGBBAA");`
* `Colors.fromString ("[#]RGBA");`
* `Colors.fromColorName ("[colorName = black]");` : si la couleur n'existe pas en CSS, c'est "black" qui sera renvoyé.

Exemples :   
```Colors.fromNormalized (.5, .5, .5).getRGBA (); // { R: 128, G: 128, B: 128, A: 255 }```  
```Colors.fromHexa ("10", "0C", "C").getHexa (); // { R: "10", G: "0C", B: "CC", A: "FF" }```  
```Colors.fromString ("#100CCC77").getHexa (); // { R: "10", G: "0C", B: "CC", A: "77" }```  
```Colors.fromString ("9A22").getHexa (); // { R: "99", G: "AA", B: "22", A: "22" }```  
```Colors.fromColorname ("indigo").getRGBA (); // { R: 75, G: 0, B: 130, A: 255 }```  



# Manipulations
On peut manipuler les composantes de la couleur dans le format qu'on veut, la mise à jour se fait automatiquement.  
Ces opérations peuvent être chainées.  

* `setRgbaR (R)`
* `setRgbaG (G)`
* `setRgbaB (B)`
* `setRgbaA (A)`
* `setRGBA (R, G, B, [A = <currentAlphaValue>] )` : si non précisée, la valeur de l'alpha est laissée dans son état actuel.  
* `setNormalizedR (R)`
* `setNormalizedG (G)`
* `setNormalizedB (B)`
* `setNormalizedA (A)`
* `setNormalized (R, G, B, [A = <currentAlphaValue>] )`
* `setHexaR (R)`
* `setHexaG (G)`
* `setHexaB (B)`
* `setHexaA (A)`
* `setHexa (R, G, B, [A = <currentAlphaValue>] )`
* `setHslaH (H)`
* `setHslaS (S)`
* `setHslaL (L)`
* `setHslaA (A)`
* `setHSLA (H, S, L, [A = <currentAlphaValue>] )`

Exemple :   
```Colors.fromColorName ("indigo").setRgbaR (255).setHslaL (0.1).setHexaG ("2").setNormalizedA (.5).getHexa (); // { R: "33", G: "22", B: "1A", A: "80" }```

# Helpers
### CSS
Obtenir un format CSS rapidement :  
* `toCSS_hex ([noPrefix = false])` : chaine au format "#RRGGBB" ou "RRGGBB" si `noPrefix` est à `true`. 
* `toCSS_hexa ([noPrefix = false])` : chaine au format "#RRGGBBAA".
* `toCSS_hsl ([precision = 2])` : chaine au format `hsl(H, SS%, LL%)`. Le paramètre `precision` permet de préciser le nombre de chiffres après la virgule désiré.
* `toCSS_hsla ([precision = 2], [precisionAlpha = 2])` : chaine au format `hsl(H, SS%, LL%, A)`. L'alpha est compris en 0 et 1, Le paramètre supplémentaire `precisionAlpha` permet d'ajuster sa précision. 
* `toCSS_rgb ()` : chaine au format `rgb(RR, GG, BB)`.
* `toCSS_rgba ()` : chaine au format `rgb(RR, GG, BB, AA)`.  

Exemple :  
```Colors.fromHSLA (220.5, .709, .458, .5).toCSS_hex (); // "#2258C8"```

### Luminosité et gestion de la couleur
On peut augmenter ou diminuer rapidement la luminosité de la couleur. Par défaut, l'alpha n'est pas touché, sauf si le paramètre `applyToAlpha` est à `true`.
* `lighten (value, [applyToAlpha = false])` : value est un pourcentage compris entre -100 et 100.
* `darken (value, [applyToAlpha = false])`

Exemples :  
```Colors.fromColorName ("indigo").lighten (50); // augmente l'intensité de la couleur de 50%```  
```new Colors (255, 255, 255).darken (25); // assombri la couleur de 25%```  

### Autres outils
* `clone ()` : copie la couleur actuelle dans une nouvelle instance. 
* `getComplementaryColor ()` : retourne la couleur complémentaire sous la forme d'une nouvelle instance (la couleur original n'est pas modifiée). 
* `getInt32ARGB ()` : la couleur est retournée sour la forme d'un entier 32 bits non signé au format ARGB (utile pour la manipulation de pixel par exemple). 
* `getInt32BGRA ()` : pareil, mais au format BGRA.

Exemples :  
```const color = Colors.fromColorName ("indigo");```  
```color.getComplementaryColor ().getRGBA (); // { R: 55, G: 130, B: 0, A: 255 }```    
```color.getHexa (); // { R: "4B", G: "00", B: "82", A: "FF" }```  
```color.getInt32BGRA (); // 2181057535 (0x82004bff)```