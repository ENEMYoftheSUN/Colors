Simple gestion des couleurs en JS.

# Bases


A partir de valeurs RGB. Les composants doivent être compris entre 0 et 255.  
```const color = new Colors (34, 88, 200);```

Le canal alpha est par défaut à 255, mais on peut le préciser si nécessaire.  
```const color = new Colors (34, 88, 200, 145);```

On peut alors convertir la couleur dans différents formats, à savoir en RGBA, en héxadécimal, en HSLA ou en version normalisée (vecteur), et celà dans tous les sens.  

##### RGBA  
Valeurs entières comprises entre 0 et 255 :  
```color.getRGBA ();    // { R: 34, G: 88, B: 200, A: 145 }```  
```color.getRGBAasArray (); // [ 34, 88, 200, 145 ]```   

##### Normalized
Valeurs flottantes comprises entre 0 et 1 :  
```color.getNormalized (); // { R: 0.13333333333333333, G: 0.34509803921568627, B: 0.7843137254901961, A: 0.5686274509803921 }```  
```color.getNormalizedAsArray (); // [ 0.13333333333333333, 0.34509803921568627, 0.7843137254901961, 0.5686274509803921 ]```  

##### Hexa
Valeurs comprises entre "00" et "FF" (en majuscule) :  
```color.getHexa (); // { R: "22", G: "58", B: "C8", A: "91" }```      
```color.getHexaAsArray (); // [ "22", "58", "C8", "91" ]```  

##### HSLA
La valeur H (teinte) est en degré et est un flottant compris entre 0 et 360, les autres composantes sont aussi des flottants mais compris entre 0 et 1.  
```color.getHSLA (); // { H: 220.48192771084337, S: 0.7094017094017094, L: 0.4588235294117647, A: 0.5686274509803921 }```        
```color.getHSLAasArray (); // [ 220.48192771084337, 0.7094017094017094, 0.4588235294117647, 0.5686274509803921 ]```  

# Instanciations avancées
On peut utiliser le format de son choix pour créer sa couleur. Les fourchettes de valeurs et les types sont les mêmes que ceux vu plus haut.  
Si le canal alpha est omis, il prendra toujours sa valeur maximales selon le format (255, "FF" ou 1.0).

```const color = Colors.fromNormalized (.5, .5, .5);```  
```color.getRGBA (); // { R: 128, G: 128, B: 128, A: 255 }```    

```const color = Colors.fromHSLA (220.5, .709, .458);```  
```color.getRGBA (); // { R: 34, G: 88, B: 200, A: 255 }```  

On peut bien entendu utiliser directement du CSS. Soit composante par composante avec `fromHexa` :    
```const color = Colors.fromHexa ("10", "0C", "C"); // "0C" restera "0C", mais "C" sera converti en "CC"```  
```color.getHexa (); // { R: "10", G: "0C", B: "CC", A: "FF" }```  

Soit au format "RRGGBB", "RGB", "RRGGBBAA" ou "RGBA" avec `fromString` (le préfixe "#" peut être omis) :  
```const color = Colors.fromString ("7EF");```  
```color.getHexa (); // { R: "77", G: "EE", B: "FF", A: "FF" }```    
```const color = Colors.fromString ("#77EEFFaa");```  
```color.getHexa (); // { R: "77", G: "EE", B: "FF", A: "AA" }```  

On peut utiliser aussi le nom d'une couleur avec la méthode statique `fromColorName` :  
```const color = Colors.fromColorName ("indigo");```  
```color.getHexa (); // { R: "4B", G: "00", B: "82", A: "FF" }```  

# Manipulations
On peut changer la composante de son choix, les formats sont mis à jour automatiquement.  
Il existe une opération par composante pour chaque format (R, G, B, A ou H, S, L, A), ou on peut changer tout d'un coup.  
Ces opérations peuvent être chainées.  
```Colors.fromColorName ("indigo").setRgbaR (255).setHslaL (.5).getHexa (); // { R: "FF", G: "00", B: "82", A: "FF" }```  

###### Liste des méthodes disponibles :
* `setRgbaR`
* `setRgbaG`
* `setRgbaB`
* `setRgbaA`
* `setRGBA`
* `setNormalizedR`
* `setNormalizedG`
* `setNormalizedB`
* `setNormalizedA`
* `setNormalized`
* `setHexaR`
* `setHexaG`
* `setHexaB`
* `setHexaA`
* `setHexa`
* `setHslaR`
* `setHslaG`
* `setHslaB`
* `setHslaA`
* `setHSLA`

# Helpers
### CSS
Obtenir un format CSS rapidement :  
* `toCSS_hex` : chaine au format "#RRGGBB" 
* `toCSS_hexa` : chaine au format "#RRGGBBAA"
* `toCSS_hsl` : chaine au format "hsl(H, SS%, LL%)". Un paramètre permet d'avoir la précision voulue (2 chiffres après la virgule par défaut).
* `toCSS_hsla` : chaine au format "hsl(H, SS%, LL%, A)". Le canal alpha est compris en 0 et 1, un paramètre supplémentaire permet d'ajuster sa précision (2 par défaut). 
* `toCSS_rgb` : chaine au format "rgb(RR, GG, BB)"
* `toCSS_rgba` : chaine au format "rgb(RR, GG, BB, AA)"  

Exemple :  
```Colors.fromHSLA (220.5, .709, .458, .5).toCSS_hex (); // "#2258C8"```

### Luminosité et gestion de la couleur
On peut augmenter ou diminuer rapidement la luminosité de la couleur avec `lighten` et `darken`. Les paramètres s'expriment en pourcentage et peuvent varier de -100 à 100% :  
```Colors.fromHSLA (220.5, .709, .458, .5).lighten (50); // augmente l'intensité de la couleur de 50%```  
```Colors.fromHSLA (220.5, .709, .458, .5).darken (25); // assombri la couleur de 25%```  

On peut aussi obtenir directement la couleur complémentaire avec `getComplementaryColor`.  
Un nouvel object est renvoyé, ne modifiant pas l'original :  
```const color = Colors.fromColorName ("indigo");```  
```color.getComplementaryColor ().getRGBA (); // { R: 55, G: 130, B: 0, A: 255 }```    
```color.getRGBA (); // { R: 75, G: 0, B: 130, A: 255 }```  

### Autres outils
Si necessaire, on peut tout simplement cloner l'object en cours avec `clone`:  
```const color = Colors.fromColorName ("indigo");```  
```const colorClone = color.clone ();```  

Deux fonctions existent aussi afin de récupérer la couleur dans un format 32 bits non signés, utile lors de la manipulation de pixels par exemple.  
Il s'agit de `getInt32ARGB` et `getInt32BGRA` qui retourne respectivement la couleur au format AARRGGBB et BBGGRRAA.