import * as React from 'react';
import styles from './Firstwebpart.module.scss';
import type { IFirstwebpartProps } from './IFirstwebpartProps';
import { Checkbox, ChoiceGroup, DatePicker, DayOfWeek, DefaultButton, Dropdown, IDropdownOption, Label, Pivot, PivotItem, TextField, defaultDatePickerStrings } from '@fluentui/react';
import { SPOperation, } from './Services/SPOps';
import { IFirstwebpartState } from './IFirstwebpartState';


// import { event } from 'jquery';
// import { jQuery} from '/jquery';
// import { bootstrap} from "bootstrap";
// require('../../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
// require('../../../../node_modules/@fontawesome/fontawesome-free/css/all.min.css');

// const choice_options: IChoiceGroupOption[] = [
//    { key: 'Male', text: 'Male' },
//    { key: 'Female', text: 'Female' },

//  ];








export default class Firstwebpart extends React.Component<IFirstwebpartProps, IFirstwebpartState, {}> {

  public _spServices: SPOperation;
  public selectedClientName: String;
  public selectedGender: string;
  public selectedPhoneNumber: string;
  public selectedAddress: string;
  public selectedLeaveType: string;
  public selectedUrgent: boolean;
  public selectedReason: string;
  public selectedContact: string;

  constructor(props: IFirstwebpartProps) {
    super(props);
    this._spServices = new SPOperation(this.props.siteURL);

    this.state = {
      listTitle: [],
      LeaveTypeList: [],
      DateOfBirth: new Date(),
      DateFrom: new Date(),
      DateTo: new Date(),


    };

   

  }

  public CreateItem=(SubmissionType:any)=>{
    let PostData:any={};
    PostData={
      LeaveType:this.selectedLeaveType,
      LeaveReason:this.selectedReason,
      FromDate:this.state.DateFrom,
      ToDate:this.state.DateTo,
      Urgent:this.selectedUrgent==true?"Urgent":"N/A",
      // Half/FullDay:
      ContactNumber:this.selectedContact
      // EmployeeEmail:

    }
    this._spServices.CreateListItem(this.props.Context,PostData)
    .then((result:string)=>{

    })

};
  

  public componentDidMount(): void {

    this._spServices.getListTitles(this.props.Context).then((data: any) => {
      var listTitle: IDropdownOption[] = [];
      data.map((result: any) => {
        listTitle.push({
          key: result.Title,
          text: result.Title
        })
      })
      this.setState({
        listTitle: listTitle
      })
    })

    this._spServices.getLeaveType(this.props.Context).then((data: any) => {
      var LeaveTypeList: IDropdownOption[] = [];
      data.map((result: any) => {
        LeaveTypeList.push({
          key: result.Title,
          text: result.Title
        })
      })
      this.setState({
        LeaveTypeList: LeaveTypeList
      })
    })




  }
  // get clientName from the dropdown
  public getClientName = (event: any, data: any) => {
    this.selectedClientName = data.text;
  }
  // get clientGender
  public getClientGender = (event: any, data: any) => {
    this.selectedGender = data.text;
  }
  //get Date of birth
  public getDateOfBirth = (DateOfBirth: Date | null | undefined): void => {
    this.setState({ DateOfBirth: DateOfBirth })
  }
  // get client phone number
  public getPhoneNumber = (event: any, data: any) => {
    this.selectedPhoneNumber = data;
  }
  // get clientGender
  public getAddress = (event: any, data: any) => {
    this.selectedAddress = data;
  }
  // get vaiue from urgent checkbox
  public getUrgent = (event: any, data: any) => {
    this.selectedUrgent = data;
  }


  // get Leave type from drowdown
  public getLeaveType = (event: any, data: any) => {
    this.selectedLeaveType = data;
  }
  // get Date from
  public getDateFrom = (DateFrom: Date | null | undefined): void => {
    this.setState({ DateFrom: DateFrom })
  }
  // get Date To
  public getDateTo = (DateTo: Date | null | undefined): void => {
    this.setState({ DateTo: DateTo })
  }
  // get Reason from Textfield
  public getReason = (event: any, data: any) => {
    this.selectedReason = data;
  }
  // get contact
  public getContact = (event: any, data: any) => {
    this.selectedContact = data;
  }


  public render(): React.ReactElement<IFirstwebpartProps> {
    const {

    } = this.props;

    return (
      <section className={`${styles.firstwebpart} `}>
        <div className={styles.formBody}>
          <div className={styles.row}>
            <div className='styles.col-md-7'>
              <h4>Leave Management</h4>
            </div>

          </div>
          <br></br>
          <div role='toolbar' aria-label='Onchange Pivot Example' >
            <Pivot aria-label="Basic Pivot Example" >
              <PivotItem
                headerText="Submit New Request"

                headerButtonProps=
                {{
                  'data-order': 1,
                  'data-title': 'My Files Title',
                }}>

                <div className={styles.gridContainer}>
                  <div className={styles.gridBox}>
                    <div className={styles.innerbox}>
                      <Checkbox label="Urgent" className={styles.urgent} onChange={this.getUrgent} />
                      <div className={styles.choice}>
                        <ChoiceGroup options={[{ key: 'Fullday', text: 'Fullday' }]} required={true} />
                        <ChoiceGroup options={[{ key: 'Halfday', text: 'Halfday' }]} required={true} />
                      </div>
                    </div>
                    <Dropdown
                      className={styles.widthbox}
                      placeholder="Select an option"
                      label="Select Leave Type:"
                      options={this.state.LeaveTypeList}
                      onChange={this.getLeaveType}
                    />
                    <div className={styles.innerbox}>
                      <DatePicker
                        className={styles.widthbox}
                        firstDayOfWeek={DayOfWeek.Sunday}
                        placeholder="Select a date..."
                        ariaLabel="From"
                        label='From:'
                        onSelectDate={this.getDateFrom}
                        // DatePicker uses English strings by default. For localized apps, you must override this prop.
                        strings={defaultDatePickerStrings}
                      />
                      <DatePicker
                        className={styles.widthbox}
                        firstDayOfWeek={DayOfWeek.Sunday}
                        placeholder="Select a date..."
                        ariaLabel="To"
                        label='To:'
                        onSelectDate={this.getDateTo}
                        // DatePicker uses English strings by default. For localized apps, you must override this prop.
                        strings={defaultDatePickerStrings}
                      />
                    </div>
                    <TextField label="Leave Reason:" multiline className={styles.textfield} onChange={this.getReason} />
                    <TextField label="Contact:" type='number' className={styles.widthbox} onChange={this.getContact} />
                    <div className={styles.btnbox}>
                      <DefaultButton text="Submit" allowDisabledFocus className={styles.submitbtn} onClick={()=>this.CreateItem("Submitted")}/>
                    </div>
                  </div>
                  <div className={styles.gridBox}>
                    <div className={styles.balance}>
                      <Label>Balance Leave</Label>
                      <div className={styles.viewleave}>
                        <Label>1</Label>
                        <Label>Casual Leave</Label>
                      </div>
                      <div className={styles.viewleave}>
                        <Label>1</Label>
                        <Label>Earn Leave</Label>
                      </div>
                      <div className={styles.viewleave}>
                        <Label>0</Label>
                        <Label>Optional Leave</Label>
                      </div>
                    </div>
                  </div>
                </div>


              </PivotItem>
              <PivotItem
                headerText="My Leave Request">
                <div className={styles.leaveRequest}>

                </div>
              </PivotItem>


            </Pivot>
          </div>

        </div>
        {/* <div className={styles.container}>

        <Dropdown
        className={styles.name}
        placeholder="Select an option"
        label="Client Name"
        onChange={this.getClientName}
        options={this.state.listTitle}
      />
       
        <ChoiceGroup options={choice_options} onChange={this.getClientGender} label="Pick one" required={true} />;
        <Label>Date of Birth</Label>
        <DatePicker
        firstDayOfWeek={DayOfWeek.Sunday}
        placeholder="Select a date..."
        ariaLabel="Date of Birth"
       
        strings={defaultDatePickerStrings} isRequired
        onSelectDate={this.getDateOfBirth}
        className={styles.name}
        />
       
         <TextField className={styles.name} label="Phone Number" required onChange={this.getPhoneNumber}/>
         <TextField className={styles.name} label="Address" required multiline rows={3} onChange={this.getAddress}/>
        </div>
        <DefaultButton text="Submit"  allowDisabledFocus className={styles.submitbtn} />
        <div className="container">
        </div>  */}
      </section>
    );
  }
}
