// import { ProductComponent } from '';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',canActivate:[loginGuard],component:LoginComponent},
    {path:'products',canActivate:[authGuard],component:ProductComponent},
    {path:'productDetails/:id',canActivate:[authGuard],component:ProductDetailsComponent},
    {path:'addProduct',canActivate:[authGuard],component:NewProductComponent},
    {path:'updateProduct/:id',canActivate:[authGuard],component:UpdateProductComponent},

];