# Dependence Injection (DI) en Angular

## Introducción

La inyección de dependencias es un **patrón de diseño** que se utiliza para crear instancias de objetos que son proporcionadas a objetos que dependen de el objeto proporcionado.

> Inyección de Dependencias (Dependency Injection o DI) es un patrón de diseño en el que una clase requiere instancias de una o más clases y en vez de generarlas dentro de su propio constructor, las recibe ya instanciadas por un mecanismo externo.
>
> [Inyección de Componentes y Directivas en Angular](https://medium.com/angular-chile/inyecci%C3%B3n-de-componentes-y-directivas-en-angular-6ae75f64be66) by
> Osman Cea

En Angular, la inyección de dependencias se utiliza para proporcionar a los componentes, servicios y otros objetos las dependencias que necesitan para funcionar correctamente.

## Inyección de dependencias en Angular

En Angular, la inyección de dependencias se realiza utilizando el **inyector de dependencias**. Los inyectores de dependencias son una serie de objetos organizados de forma **jerárquica**, que se encarga de crear instancias de objetos, almacenarlas y proporcionarlas a los objetos que las necesitan.

Los **providers** son los objetos que se encargan de proporcionar al injector la información de como crear las dependencias que necesita. Los providers se definen en los metadatos de los objetos que necesitan las dependencias, como los componentes, directivas y módulos, así como en lar rutas.

Cuando se crea una clase que puede ser inyectada, se debe decorar con el decorador `@Injectable()`. Este decorador le indica al inyector que la clase puede ser inyectada. Además, se debe **registrar** proporcionando un **provider** para la clase, que le indica al inyector como crear una instancia de la clase.

Otra manera de verlo es pensar en consumidores y proveedores de las dependencias, con los inyectores como la abstracción que actúa como intermediario.

### Jerarquía de inyectores de dependencias en Angular

Existen dos jerarquías de inyectores de dependencias en Angular:

- EnvironmentInjector hierarchy, que incluye la jerarquía basada en módulos, en desuso en Angular StandAlone Components.
- ElementInjector hierarchy, creada implícitamente para los elementos del DOM (componente y directivas).

#### EnvironmentInjector hierarchy

Es la evolución de lo que era la jerarquía de módulos o árbol de inyectores de módulos

![Module Injector Tree](module_injector_tree.png)

- **NullInjector**: En la parte superior del árbol, Angular crea una instancia de Null Injector cuyo objetivo es generar un error si no se puede encontrar una dependencia.
  Se puede evitar este error con el decorador @Optional al inyectar la dependencia.

- **PlatformInjector**: Es el inyector raíz de las aplicaciones, que se crea cuando se inicia una aplicación o un conjunto de ellas en una misma ventana. Generalmente incluye proveedores integrados como DomSanitize, etc.

- **RootInjector**: El módulo raíz es el lugar donde se proporcionan dependencias para toda la aplicación, registradas de alguna de las siguientes formas:

  - Metadatos de proveedores de @NgModule del módulo raíz.
  - Metadatos de proveedores de @NgModule de todos los módulos importados y cargados de forma estándar (Eagerly), es decir no Lazy .
  - Todos los servicios que tienen providedIn metadatos con valor root o any en su decorador @Injectable(). Incluye servicios de módulos cargados con anticipación (eagerly) y con carga diferida (lazy).

Este único "inyector raíz" recopila todos los proveedores de los **módulos transitivos**. Esto significa que si tenemos un módulo con algunos proveedores e importamos este módulo directamente en AppModule o en cualquier otro módulo que ya haya sido importado en AppModule, entonces esos proveedores se convierten en proveedores de toda la aplicación.

Por tanto, todos los módulos no Lazy compartan la instancia singleton de las dependencias, con independencia de si se registran en el módulo raíz o en un módulo importado. Incluso es posible que un módulo tenga una instancia de una dependencia que se haya registrado no solo en el módulo raíz, sino incluso en otro módulo.

En cualquier caso, el funcionamiento jerárquico permitirá redefinir el provider en un módulo, con una implementación que se usara en dicho módulo y sus descendientes.

- **LazyModuleInjector**: para cada módulo cargado de forma diferida (Lazy), se crea un inyector de módulo que se conecta al inyector raíz. Este inyector de módulo se crea cuando se carga el módulo y se destruye cuando se descarga el módulo. Los providers específicos de este módulo se registran:

  - En los metadatos de los providers de @NgModule del módulo cargado de forma diferida.
  - Para todos los servicios que tienen providedIn metadatos con valor any en su decorador @Injectable().

#### ElementInjector hierarchy

El **árbol de inyectores de elementos** se crea para cada componente y directiva en el árbol de elementos del DOM. Cada componente y directiva tiene su propio inyector de elementos. Angular destruirá el inyector cuando Angular destruya el elemento.

Cada inyector obtiene la lista de proveedores de @Directive() o @Component(). Si la matriz de proveedores está vacía, Angular crea un inyector vacío.
La instancia Injector del componente raíz se convierte en el Injector raíz del árbol Injector de elementos y obtiene los proveedores de la propiedad del proveedor del componente raíz.

### Resolución de dependencia

Las dependencias se resuelven en 2 etapas y de forma secuencial:

1. Se resuelve utilizando la jerarquía de inyectores de elementos.
2. Si no se encuentra en la anterior jerarquía, se busca en la jerarquía de inyectores de módulos.

## Proveer dependencias en Angular

Para hacer que una dependencia, generalmente un servicio, esté disponible en el Sistema de Inyección de Dependencias(DI) hay que proveerlo (proporcionarlo). Este registro en el provider puede hacerse a diferentes niveles.

En aplicaciones basadas en módulos, estos niveles incluyen:

- el array de providers de un módulo `providers: [MyService]`
- a nivel raíz de la aplicación, configurando el array de providers del usar bootstrapModule.

En aplicaciones modernas, basadas en componentes standalone los niveles incluyen:

- Desde el propio servicio, con el objeto de configuración del decorador @Injectable: `@Injectable({ providedIn: 'root' })`
- En el array de providers: `providers: [MyService]`
  - de un componente o directiva
  - de una ruta
- a nivel del fichero de configuración de la aplicación, en el array de providers del objeto de la clase ApplicationConfig. A este nivel existen nuevas funciones de Angular para la definición de providers específicos (provideRouter, provideHttpClient...).

En resumen, aunque a distintos niveles, solo son 2 los mecanismos para proveer dependencias:

- Desde el propio servicio, con el objeto de configuración del decorador @Injectable: `@Injectable({ providedIn: 'root' })`
- en el array de providers a diversos niveles: `providers: [MyService]`

### Proveer dependencias desde el servicio

Para proveer una dependencia desde el propio servicio, se utiliza el objeto de configuración del decorador `@Injectable`. Este objeto de configuración tiene una propiedad `providedIn` que se utiliza para especificar el nivel en el que se proveerá la dependencia.

Son 3 los valores posibles para `providedIn`:

- `root`: La dependencia se proveerá a nivel de la aplicación, es decir, será una dependencia singleton que estará disponible para toda la aplicación. Este es el valor más común, registrando el servicio en el **RootInjector**.
- `platform`: La dependencia se proveerá a nivel de la plataforma, es decir, será una dependencia singleton que estará disponible para todas las aplicaciones que se ejecuten en la misma plataforma.
- `any`: La dependencia se proveerá a nivel de módulo, es decir, será una dependencia singleton que estará disponible para todos los componentes y servicios que se encuentren en el mismo módulo.

Este mecanismo permite a Angular y a los optimizadores de código eliminar automáticamente los servicios no utilizados (lo que se conoce como tree-shaking).

## Info

[Inyección de dependencias en Angular. Parte 1](https://www.linkedin.com/pulse/inyecci%C3%B3n-de-dependencias-en-angular-parte-1-crhistian-beteta-navarro-tsdmf/) by Crhistian Beteta Navarro. Mayo de 2024

[Angular DI Serie](https://medium.com/@zero_ng) by Jhoset NG. Agosto de 2024

[Hierarchical Dependency Injection && Resolution in Angular](https://medium.com/@sinanozturk/hierarchical-dependency-injection-resolution-in-ang-0a6f6d359d26) by
Sinan Öztürk in Medium. Diciembre de 2023

[What you always wanted to know about Angular Dependency Injection tree](https://angularindepth.com/posts/1261/what-you-always-wanted-to-know-about-angular-dependency-injection-tree) from Angular In Depth. 2024
