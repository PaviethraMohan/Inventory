import { Component, OnInit, ViewChild } from '@angular/core';
import { categoryMaster } from '../model/categoryMaster.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { categoryService } from '../services/category.service';
import { ToastService } from '../services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
interface APIResponse {
  isSuccess: boolean;
  result: categoryMaster[]; 
  message: string[];
}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category:categoryMaster[]=[];
  pageSize = 5; 
  pageIndex = 0;
  dataSource: MatTableDataSource<categoryMaster>;
  updatedCategory: string | null = null;
  selectedCategory: categoryMaster | null = null;
  categoryToDelete: number | null = null; 
  catogoryToActivate: number | null = null;
  addCategory:categoryMaster={
    categoryId:0,
    categoryName:'',
    statusFlag:false

  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['category', 'actions'];
  currentPageEvent: PageEvent = { pageIndex: 0, pageSize: this.pageSize, length: 0 };

  constructor(private categoryService:categoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService:ToastService){
    this.dataSource = new MatTableDataSource<categoryMaster>(this.category);
  }
  openUpdateModal(category: categoryMaster) {
    this.selectedCategory = category;
    this.updatedCategory = category.categoryName; 
    $('#updateModal').modal('show');
  }
  updateCategory() {
    if (this.selectedCategory && this.updatedCategory !== null) {
    this.selectedCategory.categoryName = this.updatedCategory;
    this.categoryService.updateCategory(this.selectedCategory).subscribe({
      next: () => {
        this.toastService.showSuccess('Category updated successfully');
        $('#updateModal').modal('hide');       
      },
      error: (error) => {
        this.toastService.showError(error.error.message[0]);
      }
    });
    this.updatedCategory = null; 
    }  
  }
  closeUpdateModal() {
    $('#updateModal').modal('hide');
  }
  openDeleteConfirmation(category: number) {
    this.categoryToDelete = category;
    $('#confirmationModal').modal('show'); 
  }
  openActivateConfirmation(category: number) {
    this.catogoryToActivate =category;
    $('#activationModal').modal('show');
  }
  deleteConfirmedCategory(){
    if (this.categoryToDelete !== null) {
      // Call the service to delete the role
      this.categoryService.deleteCategory(this.categoryToDelete).subscribe({
        next: () => {
          this.toastService.showSuccess('Role deleted successfully');
          console.log('Deleted successfully');
          this.categoryService.getAllCategory().subscribe({
            next: (response: APIResponse) => {
              if (response.isSuccess) {
                this.category = response.result;
                this.dataSource = new MatTableDataSource(this.category);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.paginator.page.next(this.currentPageEvent);
              } else {
                console.log(response.message);
                
              }
            },
            error: (error) => {
              this.toastService.showError(error.error.message[0]);
            }
            
          });

          this.categoryToDelete = null;
          $('#confirmationModal').modal('hide');
        },
        error: (error) => {
          this.toastService.showError(error.error.message[0]);
        }
      });
    }
  }
  activateConfirmedCategory(){
    if (this.catogoryToActivate !== null) {
      this.categoryService.activateCategory(this.catogoryToActivate).subscribe({
        next: () => {
          this.toastService.showSuccess('Coutry activated successfully');
          this.categoryService.getAllCategory().subscribe({
            next: (response: APIResponse) => {
              if (response.isSuccess) {
                this.category = response.result;
                this.dataSource = new MatTableDataSource(this.category);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.paginator.page.next(this.currentPageEvent);
              } else {
                console.log(response.message);
              }
            },
            error: (error) => {
              this.toastService.showError(error.error.message[0]);
            }            
          });
          this.catogoryToActivate = null;
          $('#activationModal').modal('hide');
        },
        error: (error) => {
          this.toastService.showError(error.error.message[0]);
        }
      });
    }
  }
  createCategory() {
    this.categoryService.createCategory(this.addCategory) 
      .subscribe({
        next: (createdCountry) => {
          this.toastService.showSuccess('CAtegory added successfully');
          this.closeCreateCategoryModal(); // Close the create modal
          this.categoryService.getAllCategory().subscribe({
            next: (response: APIResponse) => {
              if (response.isSuccess) {
                this.category = response.result;
                this.dataSource = new MatTableDataSource<categoryMaster>(this.category);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.paginator.page.next(this.currentPageEvent);
              } else {
                console.log(response.message);
              }
            },
            error: (error) => {
              this.toastService.showError(error.error.message[0]);
            }
          });
        },
        error: (error) => {
          this.toastService.showError(error.error.message[0]);
        }
      });
  }
  openCreateCategoryModal(){
    $('#createCategoryModal').modal('show');
  }
  closeCreateCategoryModal() {
    // Close the create country modal here
    $('#createCategoryModal').modal('hide');
  }
  onCancel(){
    $('#activationModal').modal('hide');
    $('#confirmationModal').modal('hide');
    this.router.navigate(['./'],{relativeTo:this.route})

  }

  handlePageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.currentPageEvent = event; 
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (response: APIResponse) => {
        if (response.isSuccess) {
          this.category = response.result;
          this.dataSource = new MatTableDataSource<categoryMaster>(this.category);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          console.log(response.message);
        }
      },
      error: (error) => {
        this.toastService.showError(error.error.message[0]);
      }
    });
  }

}
